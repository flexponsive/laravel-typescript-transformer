<?php

namespace Spatie\LaravelTypeScriptTransformer\Transformers;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Fqsen;
use phpDocumentor\Reflection\Type;
use ReflectionClass;
use Spatie\TypeScriptTransformer\Attributes\LiteralTypeScriptType;
use Spatie\TypeScriptTransformer\Structures\MissingSymbolsCollection;
use Spatie\TypeScriptTransformer\Structures\TransformedType;
use Spatie\TypeScriptTransformer\Transformers\Transformer;
use Spatie\TypeScriptTransformer\Transformers\TransformsTypes;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;

class EloquentModelTransformer implements Transformer
{
    use TransformsTypes;
    protected TypeScriptTransformerConfig $config;

    public function __construct(TypeScriptTransformerConfig $config)
    {
        $this->config = $config;
    }

    public function canTransform(ReflectionClass $class): bool
    {
        return $class->isSubclassOf(EloquentModel::class);
    }

    public function transform(ReflectionClass $class, string $name): ?TransformedType
    {
        if (! $this->canTransform($class)) {
            return null;
        }

        $missingSymbols = new MissingSymbolsCollection();

        $type = join([
            $this->transformProperties($class, $missingSymbols),
            $this->transformRelations($class, $missingSymbols),
        ]);

        return TransformedType::create(
            $class,
            $name,
            "{" . PHP_EOL . $type . "}",
            $missingSymbols
        );
    }

    public function getPublicRelations(ReflectionClass $class): Collection
    {
        /* @var EloquentModel */
        $instance = $class->newInstance();

        $showModelCommand = app()->make(\Illuminate\Database\Console\ShowModelCommand::class);
        $showModelCommandReflection = new ReflectionClass($showModelCommand);

        $res = $showModelCommandReflection->getMethod('getRelations')->invoke(
            $showModelCommand,
            $instance
        );

        // TODO allow hiding relations through docstring or similar?

        return $res;
    }

    public function transformRelations(
        ReflectionClass $class,
        MissingSymbolsCollection $missingSymbols
    ): string {
        return array_reduce(
            $this->getPublicRelations($class)->toArray(),
            function (string $carry, $relation) use ($missingSymbols, $class) {

                $instanceType = new \phpDocumentor\Reflection\Types\Object_(new Fqsen('\\' . $relation['related']));
                $transformedType = $this->typeToTypeScript(
                    $instanceType,
                    $missingSymbols,
                    $class->getName(),
                );

                $isMany = Str::endsWith($relation['type'], 'Many');

                return $isMany
                    ? "{$carry}{$relation['name']}?: Array<{$transformedType}>;" . PHP_EOL
                    : "{$carry}{$relation['name']}?: {$transformedType};" . PHP_EOL;
            },
            ''
        );
    }

    public function getPublicAttributes(ReflectionClass $class): Collection
    {
        /* @var EloquentModel */
        $instance = $class->newInstance();
        $showModelCommand = app()->make(\Illuminate\Database\Console\ShowModelCommand::class);
        $showModelCommandReflection = new ReflectionClass($showModelCommand);

        $res = $showModelCommandReflection->getMethod('getAttributes')->invoke(
            $showModelCommand,
            $instance
        )->filter(fn ($attr) => $attr['hidden'] !== true);

        return $res;
    }

    public function getLiteralTypeScriptType(ReflectionClass $class) : array
    {
        $instance = $class->newInstance();
        $attributes = (new ReflectionClass($instance))->getAttributes(LiteralTypeScriptType::class);

        if (! $attributes) {
            return [];
        }

        $overrides = (array)$attributes[0]->getArguments()[0];

        return $overrides;
    }

    public function transformProperties(
        ReflectionClass $class,
        MissingSymbolsCollection $missingSymbols
    ): string {
        $literalTypeScriptType = $this->getLiteralTypeScriptType($class);

        return array_reduce(
            $this->getPublicAttributes($class)->toArray(),
            function (string $carry, $property) use ($missingSymbols, $class, $literalTypeScriptType) {
                $type = null;
                
                if (isset($literalTypeScriptType[$property['name']])) {
                    $transformedType = $literalTypeScriptType[$property['name']];
                } else {
                    if ($property['cast']) {
                        $type = $this->inferTypeFromCast($property['cast']);
                    } elseif ($property['type']) {
                        $type = $this->inferTypeFromDbFieldDescription($property['type']);
                    }
                    $transformedType = $this->typeToTypeScript(
                        $type ?? new \phpDocumentor\Reflection\Types\Mixed_(),
                        $missingSymbols,
                        $class->getName(),
                    );
                }

                $isOptional = $property['nullable'] == true;

                return $isOptional
                    ? "{$carry}{$property['name']}?: {$transformedType};" . PHP_EOL
                    : "{$carry}{$property['name']}: {$transformedType};" . PHP_EOL;
            },
            ''
        );
    }

    public function inferTypeFromCast(string $castedAs): Type
    {
        if (Str::startsWith($castedAs, 'encrypted:')) {
            $castedAs = Str::replaceFirst('encrypted:', '', $castedAs);
        }
        if (Str::contains($castedAs, ':')) {
            $castedAs = explode(':', $castedAs)[0];
        }

        /* @var \phpDocumentor\Reflection\Type */
        $phpdocumentorType = null;
        switch ($castedAs) {
            case 'datetime':
            case 'immutable_datetime':
            case 'date':
            case 'immutable_date':
            case 'hashed':
            case 'Illuminate\Database\Eloquent\Casts\AsStringable':
            case 'AsStringable':
            case 'decimal':
            case 'encrypted':
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\String_();

                break;
            case 'array':
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\Array_();

                break;
            case 'boolean':
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\Boolean();

                break;
            case 'double':
            case 'float':
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\Float_();

                break;
            case 'int':
            case 'integer':
            case 'timestamp':
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\Integer();

                break;
            case 'object':
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\Object_();

                break;
            default:
                // echo 'castedAS=' . $castedAs;
                $phpdocumentorType = new \phpDocumentor\Reflection\Types\Object_(new Fqsen('\\' . $castedAs));

                break;
        }

        return $phpdocumentorType;
    }

    public function inferTypeFromDbFieldDescription($dbFieldDescription): ?Type
    {
        preg_match('/^([^ \(]+)/', $dbFieldDescription, $matches);
        $dbFieldType = $matches[1];

        if ($dbFieldType == 'string') {
            return new \phpDocumentor\Reflection\Types\String_();
        } elseif (Str::endsWith($dbFieldType, 'int')) {
            return new \phpDocumentor\Reflection\Types\Integer();
        } else {
            return null;
        }
    }
}

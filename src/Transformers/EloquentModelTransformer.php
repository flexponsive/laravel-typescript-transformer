<?php

namespace Spatie\LaravelTypeScriptTransformer\Transformers;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use Illuminate\Database\Eloquent\ModelInspector;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Type;
use ReflectionClass;
use Spatie\TypeScriptTransformer\Structures\MissingSymbolsCollection;
use Spatie\TypeScriptTransformer\Structures\TransformedType;
use Spatie\TypeScriptTransformer\Transformers\Transformer;
use Spatie\TypeScriptTransformer\Transformers\TransformsTypes;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;

class EloquentModelTransformer implements Transformer
{
    use TransformsTypes;

    protected TypeScriptTransformerConfig $config;
    protected ModelInspector $inspector;
    protected string $currentClass;

    public function __construct(TypeScriptTransformerConfig $config)
    {
        $this->config = $config;
        $this->inspector = new ModelInspector(app());
    }

    public function canTransform(ReflectionClass $class): bool
    {
        return $class->isSubclassOf(EloquentModel::class);
    }

    public function transform(ReflectionClass $class, string $name): ?TransformedType
    {
        if (!$this->canTransform($class)) {
            return null;
        }

        $this->currentClass = $class->getName();

        $missingSymbols = new MissingSymbolsCollection();
        $details = $this->inspector->inspect($class->getName());

        $properties = $this->transformProperties($details['attributes']);
        $relations = $this->transformRelations($details['relations']);

        $transformed = "interface {$name} {" . PHP_EOL;
        $transformed .= $properties . PHP_EOL;
        $transformed .= $relations . PHP_EOL;
        $transformed .= "}";

        // Add related models to missing symbols
        foreach ($details['relations'] as $relation) {
            $missingSymbols->add($relation['related']);
        }

        return TransformedType::create(
            $class,
            $name,
            $transformed,
            $missingSymbols
        );
    }

    protected function transformProperties(Collection $attributes): string
    {
        return $attributes
            ->map(function ($attribute) {
                $type = $this->mapAttributeType($attribute);
                $type = $attribute['nullable'] ? "{$type} | null" : $type;
                
                return "    {$attribute['name']}: {$type};";
            })
            ->join(PHP_EOL);
    }

    protected function transformRelations(Collection $relations): string
    {
        return $relations
            ->map(function ($relation) {
                $pivot = null;
                $pivotAccessor = 'pivot';
                
                // Get pivot model for BelongsToMany relationships
                if ($relation['type'] === 'BelongsToMany') {
                    $relationInstance = (new $this->currentClass)->{$relation['name']}();
                    $pivot = $relationInstance->getPivotClass();
                    if (method_exists($relationInstance, 'getPivotAccessor')) {
                        $pivotAccessor = $relationInstance->getPivotAccessor();
                    }
                }
                
                $type = $this->mapRelationType($relation['type'], $relation['related'], $pivot, $pivotAccessor);
                
                // Get foreign key nullability for BelongsTo relationships
                $nullable = false;
                if ($relation['type'] === 'BelongsTo') {
                    $foreignKey = Str::snake($relation['name'] . '_id');
                    $attributes = $this->inspector->inspect($this->currentClass)['attributes'];
                    $foreignKeyAttribute = $attributes->firstWhere('name', $foreignKey);
                    $nullable = $foreignKeyAttribute ? $foreignKeyAttribute['nullable'] : false;
                }
                
                $type = $nullable ? "{$type} | null" : $type;
                return "    {$relation['name']}: {$type};";
            })
            ->join(PHP_EOL);
    }

    protected function mapAttributeType(array $attribute): string
    {
        return match($attribute['cast'] ?? $attribute['type']) {
            'int', 'integer', 'timestamp' => 'number',
            'real', 'float', 'double', 'decimal' => 'number',
            'bool', 'boolean' => 'boolean',
            'array', 'json' => 'any[]',
            'object' => 'Record<string, any>',
            'date', 'datetime' => 'string',
            default => 'string',
        };
    }

    protected function mapRelationType(string $type, string $related, ?string $pivot = null, string $pivotAccessor = 'pivot'): string
    {
        return match($type) {
            'HasOne', 'BelongsTo' => $this->getTypeName($related),
            'BelongsToMany' => $pivot 
                ? "{$this->getTypeName($related)} & { {$pivotAccessor}: {$this->getTypeName($pivot)} }" 
                : "{$this->getTypeName($related)}[]",
            'HasMany' => "{$this->getTypeName($related)}[]",
            'MorphTo', 'MorphOne' => 'any',
            'MorphMany' => 'any[]',
            default => 'any',
        };
    }

    protected function getTypeName(string $class): string
    {
        return class_basename($class);
    }
}

<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Award;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Casting;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Movie;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Person;
use Spatie\LaravelTypeScriptTransformer\Transformers\EloquentModelTransformer;
use Spatie\TemporaryDirectory\TemporaryDirectory;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->loadMigrationsFrom(__DIR__ . '/../Fixtures/database/migrations');
    $this->temporaryDirectory = (new TemporaryDirectory())->create();
    $this->transformer = new EloquentModelTransformer(
        resolve(TypeScriptTransformerConfig::class)
    );
});

it('can transform the movie model', function () {
    $type = $this->transformer->transform(
        new ReflectionClass(Movie::class),
        'Movie'
    );

    expect($type->transformed)->toMatchSnapshot();
});

it('can transform the person model', function () {
    $type = $this->transformer->transform(
        new ReflectionClass(Person::class),
        'Person'
    );

    expect($type->transformed)->toMatchSnapshot();
});

it('can transform the award model', function () {
    $type = $this->transformer->transform(
        new ReflectionClass(Award::class),
        'Award'
    );

    expect($type->transformed)->toMatchSnapshot();
});

it('can transform pivot models', function () {
    $type = $this->transformer->transform(
        new ReflectionClass(Casting::class),
        'Casting'
    );

    expect($type->transformed)->toMatchSnapshot();
});

it('can transform end-to-end', function () {
    // Setup temporary output directory
    
    $outputPath = $this->temporaryDirectory->path('models.d.ts');
    
    // Configure the transformer
    config()->set('typescript-transformer.auto_discover_types', [
        __DIR__ . '/../Fixtures/Models',
        __DIR__ . '/../Fixtures/Enums',
    ]);
    config()->set('typescript-transformer.transformers', [
        \Spatie\TypeScriptTransformer\Transformers\EnumTransformer::class,
        \Spatie\LaravelTypeScriptTransformer\Transformers\EloquentModelTransformer::class,
    ]);
    config()->set('typescript-transformer.output_file', $outputPath);

    // Run the transformation
    $this->artisan('typescript:transform')->assertExitCode(0);

    // Verify the output content
    expect(file_get_contents($outputPath))->toMatchSnapshot();

});

it("generates typescript types that the model conforms to", function () {
    // generate the typescript types for our eloquent models
    $outputPath = $this->temporaryDirectory->path('models.d.ts');
    config()->set('typescript-transformer.auto_discover_types', [
        __DIR__ . '/../Fixtures/Models',
        __DIR__ . '/../Fixtures/Enums',
    ]);
    config()->set('typescript-transformer.transformers', [
        \Spatie\TypeScriptTransformer\Transformers\EnumTransformer::class,
        \Spatie\LaravelTypeScriptTransformer\Transformers\EloquentModelTransformer::class,
    ]);
    config()->set('typescript-transformer.output_file', $outputPath);
    $this->artisan('typescript:transform')->assertExitCode(0);
    $typeDefinitions = file_get_contents($outputPath);

    // load the sample data and serialize it to json

    Carbon\Carbon::setTestNow('2025-01-01 00:00:00');     // set the test time to 1st january 2025
    $this->artisan("db:seed", [
        '--class' => '\Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\MovieTestDataSeeder',
        '--force' => true,
    ])->assertExitCode(0);
    
    // Load all relationships including pivot data
    $people = Person::with([
        'movies.awards',
        'movies.director',
        'movies.cast.awards',  // nested relationships for cast members
        'movies.cast.directedMovies',
        'directedMovies.awards',
        'directedMovies.cast.awards',
        'awards.awardable',  // polymorphic relation
        'mentor.directedMovies',
        'mentor.awards',
        'apprentices.directedMovies',
        'apprentices.awards',
    ])->get();
    $peopleJson = $people->toJson(JSON_PRETTY_PRINT);
    

    $typescriptFile = <<<TS
{$typeDefinitions};

const people: Spatie.LaravelTypeScriptTransformer.Tests.Fixtures.Models.Person[] = {$peopleJson};
TS;

    expect($typescriptFile)->toMatchSnapshot();
});

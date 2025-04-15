<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use ReflectionClass;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Award;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Movie;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Person;
use Spatie\LaravelTypeScriptTransformer\Transformers\EloquentModelTransformer;
use Spatie\TypeScriptTransformer\TypeScriptTransformerConfig;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->loadMigrationsFrom(__DIR__ . '/../Fixtures/database/migrations');
    
    $this->transformer = new EloquentModelTransformer(
        resolve(TypeScriptTransformerConfig::class)
    );
});

it('can run the migrations', function () {
    $tables = [
        'people',
        'movies',
        'castings',
        'awards',
    ];

    foreach ($tables as $table) {
        expect(Schema::hasTable($table))->toBeTrue("Table {$table} should exist");
    }
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
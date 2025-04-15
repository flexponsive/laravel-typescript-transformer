<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Enums\PersonType;

/** @typescript */
class Person extends Model
{
    protected $casts = [
        'awards_received' => 'array',
        'net_worth' => 'decimal:2',
        'date_of_birth' => 'date',
        'type' => PersonType::class,
    ];

    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'castings')
            ->using(Casting::class)
            ->as('casting'); // This is the name of the pivot model!
    }

    public function directedMovies(): HasMany
    {
        return $this->hasMany(Movie::class, 'director_id');
    }

    public function mentor(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'mentor_id');
    }

    public function apprentices(): HasMany
    {
        return $this->hasMany(Person::class, 'mentor_id');
    }

    public function awards(): MorphMany
    {
        return $this->morphMany(Award::class, 'awardable');
    }
}
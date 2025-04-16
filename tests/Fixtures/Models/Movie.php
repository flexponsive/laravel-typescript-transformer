<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/** @typescript */
class Movie extends Model
{
    protected $casts = [
        'metadata' => 'json',
        'box_office' => 'double',
        'runtime' => 'float',
        'release_date' => 'date',
        'premiered_at' => 'datetime',
        'is_released' => 'boolean',
    ];

    public function director(): BelongsTo
    {
        return $this->belongsTo(Person::class, 'director_id');
    }

    public function cast(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'castings')
            ->withPivot([
                'character_name',
                'billing_order',
                'salary',
                'contract_details',
            ])
            ->using(Casting::class);
    }

    public function awards(): MorphMany
    {
        return $this->morphMany(Award::class, 'awardable');
    }
}

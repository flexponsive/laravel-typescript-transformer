<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/** @typescript */
class Casting extends Pivot
{
    // potentially an upstream bug in Laravel: if we don't manually set the table name,
    // the attributes will not be shown by the ModelInspector
    protected $table = 'castings';

    protected $casts = [
        'billing_order' => 'integer',
        'salary' => 'decimal:2',
        'contract_details' => 'array',
    ];

    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class);
    }

    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }
}
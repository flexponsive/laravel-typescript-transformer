<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/** @typescript */
class Casting extends Pivot
{
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
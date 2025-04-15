<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Award extends Model
{
    public function awardable(): MorphTo
    {
        return $this->morphTo();
    }
}
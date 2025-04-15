<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Enums;

/** @typescript */
enum PersonType: string
{
    case Actor = 'actor';
    case Director = 'director';
    case Both = 'both';
}
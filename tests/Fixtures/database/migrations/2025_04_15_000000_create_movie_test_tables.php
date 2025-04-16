<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {

        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('biography')->nullable();
            $table->string('type')->comment('actor, director, both');
            $table->json('awards_received')->nullable();
            $table->decimal('net_worth', 12, 2)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->unsignedBigInteger('mentor_id')->nullable();
            $table->timestamps();

            $table->foreign('mentor_id')->references('id')->on('people');
        });

        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('plot')->nullable();
            $table->tinyInteger('rating')->nullable();
            $table->json('metadata')->nullable();
            $table->double('box_office')->nullable();
            $table->float('runtime')->nullable();
            $table->date('release_date')->nullable();
            $table->timestamp('premiered_at')->nullable();
            $table->boolean('is_released')->default(false);
            $table->unsignedBigInteger('director_id')->nullable();
            $table->timestamps();

            $table->foreign('director_id')->references('id')->on('people');
        });

        Schema::create('castings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('movie_id');
            $table->unsignedBigInteger('person_id');
            $table->string('character_name');
            $table->integer('billing_order')->nullable();
            $table->decimal('salary', 12, 2)->nullable();
            $table->json('contract_details')->nullable();
            $table->timestamps();

            $table->foreign('movie_id')->references('id')->on('movies');
            $table->foreign('person_id')->references('id')->on('people');
        });

        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->integer('year');
            $table->morphs('awardable');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('awards');
        Schema::dropIfExists('castings');
        Schema::dropIfExists('movies');
        Schema::dropIfExists('people');
    }
};

<?php

namespace Spatie\LaravelTypeScriptTransformer\Tests\Fixtures;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Award;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Movie;
use Spatie\LaravelTypeScriptTransformer\Tests\Fixtures\Models\Person;

class MovieTestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // --- People ---

        // 1. Eleanor Vance: Veteran Director, Mentor
        $eleanor = Person::create([
            'name' => 'Eleanor Vance',
            'biography' => 'A highly acclaimed veteran director, known for her visually stunning epics. She occasionally takes on mentorship roles.',
            'type' => 'director',
            'net_worth' => 75000000.00,
            'date_of_birth' => Carbon::parse('1965-03-15'),
            'mentor_id' => null, // No mentor
            'awards_received' => ([]), // Will receive an award later
        ]);

        // 2. Marcus Bellweather: Versatile Actor, Mentored by Eleanor
        $marcus = Person::create([
            'name' => 'Marcus Bellweather',
            'biography' => 'A versatile actor who started young and has built a solid career. He was mentored by Eleanor Vance early on.',
            'type' => 'actor',
            'net_worth' => 25000000.00,
            'date_of_birth' => Carbon::parse('1988-11-20'),
            'mentor_id' => $eleanor->id,
            'awards_received' => ([
                ['award' => 'Rising Star Trophy', 'year' => 2015, 'category' => 'Best Newcomer'],
            ]),
        ]);

        // 3. Chloe Dubois: Rising Star (Actor/Director)
        $chloe = Person::create([
            'name' => 'Chloe Dubois',
            'biography' => 'A rising star, known for intense dramatic performances. She recently directed her first short film and is working on her feature debut.',
            'type' => 'both',
            'net_worth' => 8000000.00,
            'date_of_birth' => Carbon::parse('1995-07-01'),
            'mentor_id' => null,
            'awards_received' => ([]),
        ]);

        // 4. Sam "The Rocket" Riley: Action Star
        $sam = Person::create([
            'name' => 'Sam "The Rocket" Riley',
            'biography' => 'A charismatic action star, famous for performing his own stunts.',
            'type' => 'actor',
            'net_worth' => 35000000.00,
            'date_of_birth' => Carbon::parse('1985-01-10'),
            'mentor_id' => null,
            'awards_received' => ([]),
        ]);

        // 5. Additional Director for "Crimson Alley" (less detailed)
        $otherDirector = Person::create([
            'name' => 'Alex Schmidt',
            'type' => 'director',
            'date_of_birth' => Carbon::parse('1972-09-05'),
        ]);


        // --- Movies ---

        // 1. "Nebula's Dawn" (Released Sci-Fi Epic)
        $nebulaDawn = Movie::create([
            'title' => "Nebula's Dawn",
            'plot' => 'A sweeping sci-fi saga about colonizing a distant galaxy.',
            'rating' => 7, // Moderate rating
            'metadata' => [
                'world_building' => 'extensive',
                'cgi_budget' => 50000000,
                'themes' => ['exploration', 'survival', 'humanity'],
            ],
            'box_office' => 450000000.50, // High box office
            'runtime' => 155.5,
            'release_date' => Carbon::parse('2023-05-19'),
            'premiered_at' => Carbon::parse('2023-05-15 19:00:00'),
            'is_released' => true,
            'director_id' => $eleanor->id,
        ]);

        // 2. "Crimson Alley" (Released Neo-Noir Thriller)
        $crimsonAlley = Movie::create([
            'title' => 'Crimson Alley',
            'plot' => 'A gritty neo-noir thriller set in a rain-soaked metropolis.',
            'rating' => 8, // High rating
            'metadata' => [
                'style' => 'neo-noir',
                'setting' => 'urban dystopia',
            ],
            'box_office' => 85000000.00, // Moderate box office
            'runtime' => 118.0,
            'release_date' => Carbon::parse('2024-01-12'),
            'premiered_at' => Carbon::parse('2024-01-10 20:00:00'),
            'is_released' => true,
            'director_id' => $otherDirector->id,
        ]);

        // 3. "Echoes in the Static" (Upcoming Psychological Thriller)
        $echoesStatic = Movie::create([
            'title' => 'Echoes in the Static',
            'plot' => 'A psychological thriller about a radio host who intercepts a strange signal.',
            'rating' => null, // Not yet rated
            'metadata' => ([
                'genre_tags' => ['thriller', 'mystery', 'psychological'],
            ]),
            'box_office' => null, // Not released
            'runtime' => null, // Not finalized
            'release_date' => Carbon::parse('2025-10-31'), // Future release
            'premiered_at' => null, // Not premiered
            'is_released' => false,
            'director_id' => $chloe->id, // Chloe's directorial debut
        ]);


        // --- Castings (Linking People to Movies) ---

        // Nebula's Dawn Cast
        $nebulaDawn->cast()->sync([
            $marcus->id => [
                'character_name' => 'Commander Jax',
                'billing_order' => 1, // Lead
                'salary' => 5000000.00,
                'contract_details' => null,
            ],
            $chloe->id => [
                'character_name' => 'Dr. Aris Thorne',
                'billing_order' => 2, // Supporting
                'salary' => 1500000.00,
                'contract_details' => null,
            ],
        ]);

        // Crimson Alley Cast
        $crimsonAlley->cast()->sync([
            $marcus->id => [
                'character_name' => 'Detective Miles Corbin',
                'billing_order' => 1, // Lead
                'salary' => 3000000.00,
                'contract_details' => ([ // Specific contract details
                    'sequel_option' => true,
                    'stunt_double_required' => false,
                ]),
            ],
            $sam->id => [
                'character_name' => 'Victor "The Ghost" Martel',
                'billing_order' => 2, // Supporting
                'salary' => 2000000.00,
                'contract_details' => ([
                    'stunt_coordinator_consult' => true,
                ]),
            ],
        ]);

        // Echoes in the Static Cast
        $echoesStatic->cast()->sync([
            $sam->id => [
                'character_name' => 'Jack Ryder (Radio Host)',
                'billing_order' => 1, // Lead
                'salary' => 4000000.00,
                'contract_details' => null,
            ],
            $marcus->id => [
                'character_name' => 'Mysterious Caller (Voice)',
                'billing_order' => 5, // Cameo, lower billing
                'salary' => 50000.00, // Cameo salary
                'contract_details' => (['voice_only' => true]),
            ],
        ]);


        // --- Awards (Polymorphic) ---

        // 1. Award for a Movie ("Nebula's Dawn")
        Award::create([
            'name' => 'Galaxy Award',
            'category' => 'Best Visuals',
            'year' => 2023,
            'awardable_id' => $nebulaDawn->id,
            'awardable_type' => Movie::class, // Morph class name
        ]);

        // 2. Award for a Person (Eleanor Vance)
        Award::create([
            'name' => 'Golden Lion Award',
            'category' => 'Lifetime Achievement',
            'year' => 2024,
            'awardable_id' => $eleanor->id,
            'awardable_type' => Person::class, // Morph class name
        ]);
    }
}

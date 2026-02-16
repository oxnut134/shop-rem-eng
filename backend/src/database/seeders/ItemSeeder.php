<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;
use Illuminate\Support\Carbon;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        // user_id = 1 のためのテストデータ
        $items = [
            ['item_name' => 'Onion', 'is_checked' => false, 'menu' => true],
            ['item_name' => 'Carot', 'is_checked' => false, 'menu' => true],
            ['item_name' => 'Beef', 'is_checked' => true, 'menu' => false, 'bought_at' => now()],
            ['item_name' => 'Potato', 'is_checked' => true, 'menu' => true, 'bought_at' => now()->subDays(6)],
            ['item_name' => 'Lettuce', 'is_checked' => true, 'menu' => true, 'bought_at' => now()->subDays(3)],
            ['item_name' => 'Tomato', 'is_checked' => true, 'menu' => true, 'bought_at' => now()->subDays(1)],
        ];

        foreach ($items as $item) {
            Item::create(array_merge($item, ['user_id' => 1]));
        }
    }
}

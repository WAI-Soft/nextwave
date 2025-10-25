<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'name' => 'NextWave Admin',
            'email' => 'admin@nextwave.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);
    }
}
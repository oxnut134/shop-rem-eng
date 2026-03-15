<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


// routes/web.php に追記
Route::get('/run-migrate', function () {
    try {
        // \Illuminate\Support\Facades\Artisan を直接指定
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return "Migration success:<br><pre>" . \Illuminate\Support\Facades\Artisan::output() . "</pre>";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});
Route::get('/run-seed', function () {
    // 本番環境では --force がないと実行を拒否されることがあります
    $exitCode = Artisan::call('db:seed', ['--force' => true]);
    return "Seeding finished with exit code: " . $exitCode;
});

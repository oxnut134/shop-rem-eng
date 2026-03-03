<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /*protected $casts = [
        'item_name' => 'encrypted', // 👈 これで DB 内では 1秒で呪文に化けるにゃ！
    ];*/
    protected $fillable = [
        'user_id', // とりあえずゲストユーザー1番で固定
        'item_name',
        'amount',
        'is_checked',

    ];
}

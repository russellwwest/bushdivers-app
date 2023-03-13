<?php

namespace App\Services\Airport;

use Illuminate\Support\Facades\Http;

class GetNearestMetar
{
    protected string $baseUrl = 'https://api.checkwx.com/metar';
    public function execute(string $icao)
    {
        $key = env('METAR_KEY');
        $res = Http::withHeaders([
            'X-API-KEY' => $key
        ])->get($this->baseUrl.'/'.$icao.'/nearest/decoded');
        if ($res->successful()) {
            $objRes = $res->object();
            if ($objRes->results > 0) {
                return ['status' => 'success', 'results' => $res->json()];
            }
            return ['status' => 'empty', 'results' => null];
        }
        return ['status' => 'failed', 'results' => null];
    }
}

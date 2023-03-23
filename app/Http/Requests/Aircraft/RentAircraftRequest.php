<?php

namespace App\Http\Requests\Aircraft;

use Illuminate\Foundation\Http\FormRequest;

class RentAircraftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'aircraft_id' => 'required',
            'user_id' => 'required'
        ];
    }
}

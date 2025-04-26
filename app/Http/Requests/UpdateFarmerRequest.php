<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFarmerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Add proper authorization logic if needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'middle_initial' => 'nullable|string|max:10',
            'birthdate' => 'nullable|date',
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('farmers')->ignore($this->farmer),
                'max:255',
            ],
            'phone_number' => 'sometimes|required|string|max:20',
            'sitio_purok' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'city' => 'sometimes|required|string|max:100',
            'province' => 'sometimes|required|string|max:100',
            'farm_description' => 'nullable|string',
            'farm_size_hectares' => 'nullable|numeric|min:0',
            'farm_count' => 'nullable|integer|min:1',
            'status' => 'nullable|string|in:active,inactive,pending',
            'membership_date' => 'nullable|date',
            'membership_renewal_date' => 'nullable|date',
            'photo' => 'nullable|image|max:2048',
        ];
    }
} 
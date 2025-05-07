'use client'

import React, { useState, ChangeEvent } from 'react'
import Button from '../../../../../components/Button'
import { CardFormData } from '../../../../../types/types'

interface AddCardFormProps {
  onSave: (formData: CardFormData) => void
  onCancel: () => void
  saveCard: boolean
  toggleSaveCard: () => void
}

const AddCardForm: React.FC<AddCardFormProps> = ({
  onSave,
  onCancel,
  saveCard,
  toggleSaveCard,
}) => {
  const [formData, setFormData] = useState<CardFormData>({
    fullName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardType: 'Visa',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="bg-white rounded-md shadow p-6 w-[90%] md:w-[90%]">
      <form className="flex flex-col w-full space-y-8">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="mt-1 w-[90%] border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700">
            Card Number
          </label>
          <input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="**** **** **** ****"
            className="mt-1 w-[90%] border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Expiry */}
        <div className='flex justify-between gap-1 w-[90%]'>
        <div>
          <label htmlFor="expiry" className="block text-sm font-semibold text-gray-700">
            Expiry
          </label>
          <input
            id="expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="mt-1 w-[30vw] min-w-[9rem] border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* CVV */}
        <div>
          <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700">
            CVV
          </label>
          <input
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            className="mt-1 w-[10vw] min-w-[7vw] xs:w-[100%] xl:w-[26rem] border border-gray-300 rounded px-3 py-2 transition-all"
          />
        </div>
        </div>
        {/* Save Card Checkbox */}
        <div className="col-span-2 flex items-center space-x-2">
          <input type="checkbox" checked={saveCard} onChange={toggleSaveCard} id="saveCard" />
          <label htmlFor="saveCard" className="text-sm text-gray-700">Save this card</label>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex gap-3">
          <Button onClick={handleSave} size="small" color="var(--black)">Save My Card</Button>
          <Button onClick={onCancel} variant="secondary" size="small" color="var(--black)">Cancel</Button>
        </div>
      </form>
    </div>
  )
}

export default AddCardForm

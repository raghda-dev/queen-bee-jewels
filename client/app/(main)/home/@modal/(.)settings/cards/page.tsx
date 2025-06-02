//client/app/(main)/home/@modal/(.)settings/cards/page.tsx

'use client'

import React, { useCallback, useState } from 'react'
import { Plus } from 'lucide-react'

import UserHeader from '../components/UserHeader'
import EmptyState from './components/EmptyState'
import AddCardForm from './components/AddCardForm'
import CardItem from './components/CardItem'
import { Card, CardFormData } from '../../../../types/types' // Adjust path if needed

const CardsSettings = () => {
  const [showAddCardForm, setShowAddCardForm] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [saveCard, setSaveCard] = useState(false)

  const addCard = (card: CardFormData) => {
    const last4 = card.cardNumber.slice(-4)
    const newCard: Card = {
      ...card,
      last4,
      isDefault: cards.length === 0,
    }
    setCards((prev) => [...prev, newCard])
    setShowAddCardForm(false)
  }

  const deleteCard = useCallback((index: number) => {
    const newCards = [...cards]
    newCards.splice(index, 1)
    setCards(newCards)
  }, [cards])

  const setDefaultCard = useCallback((index: number) => {
    const updated = cards.map((card, i) => ({
      ...card,
      isDefault: i === index,
    }))
    setCards(updated)
  }, [cards])

  return (
    <section className="flex flex-col items-center justify-start max-h-[85vh] px-4">
      <UserHeader/>
      <div className="w-full mt-10">
        {cards.length === 0 && !showAddCardForm && (
          <EmptyState onAdd={() => setShowAddCardForm(true)} />
        )}

        {showAddCardForm && (
          <AddCardForm
            onSave={addCard}
            onCancel={() => setShowAddCardForm(false)}
            saveCard={saveCard}
            toggleSaveCard={() => setSaveCard((prev) => !prev)}
          />
        )}

        {cards.length > 0 && !showAddCardForm && (
          <div className="space-y-4">
            {cards.map((card, index) => (
              <CardItem
                key={index}
                card={card}
                onDelete={() => deleteCard(index)}
                onSetDefault={() => setDefaultCard(index)}
              />
            ))}

            <button
              onClick={() => setShowAddCardForm(true)}
              className="w-full border border-dashed border-gray-300 py-4 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Card</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CardsSettings

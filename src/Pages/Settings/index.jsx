import React from 'react'
import Form from './Form'
import SettingsProvider from './SettingsProvider'

const Settings = () => {
  return (
    <SettingsProvider>
      <Form />
    </SettingsProvider>
  )
}

export default Settings

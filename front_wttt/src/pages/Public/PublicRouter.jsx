import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { PublicLayout, LoginForm, Home, RegistrationForm, Offerer, Profil, Error} from './index'
import { Error405 } from '../../_utils/Error405'
import { AuthGuard } from '../../_helpers/AuthGuard'
import { OffererGuard } from '../../_helpers/OffererGuard'

export default function PublicRouter() {
  return (

      <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />}/>
            <Route path='login' element={<LoginForm />}/>
            <Route path='registration' element={<RegistrationForm />} />
            <Route path='offerer' element={
            <OffererGuard>
              <Offerer/>
            </OffererGuard>
            }/>
            <Route path='profil' element={
            <AuthGuard>
              <Profil />
            </AuthGuard>
            }/>
            <Route path='error_405' element={<Error405/>} />
            <Route path='*' element={<Error />} />
          </Route>
      </Routes>
  )
}

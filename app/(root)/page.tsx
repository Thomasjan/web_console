"use client";
import Header from '@/components/shared/Header'
import React, { useEffect, useState } from 'react'
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";

const Home = () => {

  const [apiStatus, setApiStatus] = useState(false)
  const [apiErpStatus, setApiErpStatus] = useState(false)
  const [kazeCredentialsStatus, setKazeCredentialsStatus] = useState(false)
  const [apiStatusLoading, setApiStatusLoading] = useState(false)
  const [connexionKazeERPLoading, setConnexionKazeERPLoading] = useState(false)
  const [kazeCredentialsLoading, setKazeCredentialsLoading] = useState(false)

  useEffect(() => {
    testAPIStatus()
    testConnexionKazeERP()
    testKazeCredentials()
  }, [])

  const testAPIStatus = async () => {
    setApiStatusLoading(true)
    //wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      console.log(process.env.KAZE_API_URL)
      const response = await fetch(process.env.KAZE_API_URL || 'http://localhost:3000/')
      const data = await response.json()
      if(data.status === 'ok') setApiStatus(true)
      else setApiStatus(false)
    } catch (error) {
      console.error('Error:', error)
      setApiStatus(false)
    }
    setApiStatusLoading(false)
  }

  const testConnexionKazeERP = async () => {
    setConnexionKazeERPLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const response = await fetch(`${process.env.KAZE_API_URL}/connexionERP`)
      const data = await response.json()
      if(data.status === 'ok') setApiErpStatus(true)
      else setApiErpStatus(false)
    } catch (error) {
      console.error('Error:', error)
      setApiErpStatus(false)
    }
    setConnexionKazeERPLoading(false)
  }

  const testKazeCredentials = async () => {
    setKazeCredentialsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const response = await fetch(`${process.env.KAZE_API_URL}/v1/kaze/testConnection`)
      const data = await response.json()
      if(data.status === 'ok') setKazeCredentialsStatus(true)
      else setKazeCredentialsStatus(false)
    } catch (error) {
      console.error('Error:', error)
      setKazeCredentialsStatus(false)
    }
    setKazeCredentialsLoading(false)
  }



  return (
    <div>
      <Header title="Accueil" subtitle="Console d'administration ERP - KAZE" />
      <div className=' mt-8 w-[400px] sm:w-4/6 bg-blue-100 h-96 rounded-md shadow-xl p-6 flex flex-col gap-8'>
        <div className='flex items-center'>
          <button onClick={testAPIStatus} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
          <h2 className='font-bold'>Connexion à l&apos;API :</h2>
          {apiStatusLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
          {apiStatus && !apiStatusLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
          {!apiStatus && !apiStatusLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
        </div>

        <div className='flex items-center'>
          <button onClick={testConnexionKazeERP} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
          <h2 className='font-bold'>Connexion à l&apos;ERP : </h2>
          {connexionKazeERPLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
          {apiErpStatus && !connexionKazeERPLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
          {!apiErpStatus && !connexionKazeERPLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
        </div>

        <div className='flex items-center'>
          <button onClick={testKazeCredentials} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
          <h2 className='font-bold'>Connexion à Kaze : </h2>
          {kazeCredentialsLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
          {kazeCredentialsStatus && !kazeCredentialsLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
          {!kazeCredentialsStatus && !kazeCredentialsLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
        </div>
      </div>
      
      
    </div>
  )
}

export default Home
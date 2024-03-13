"use client";
import Header from '@/components/shared/Header'
import React, { useEffect, useState } from 'react'
import { GrStatusWarning, GrStatusGood } from "react-icons/gr";
import { BiLoaderAlt } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast"
import { cn } from '@/lib/utils';

const Home = () => {

  const { toast } = useToast()
  
  const [apiStatus, setApiStatus] = useState(false)
  const [apiErpStatus, setApiErpStatus] = useState(false)
  const [kazeCredentialsStatus, setKazeCredentialsStatus] = useState(false)
  const [apiStatusLoading, setApiStatusLoading] = useState(false)
  const [connexionKazeERPLoading, setConnexionKazeERPLoading] = useState(false)
  const [kazeCredentialsLoading, setKazeCredentialsLoading] = useState(false)

  const [statusGetJobsScript, setStatusGetJobsScript] = useState(false)
  const [getJobsScriptLoading, setGetJobsScriptLoading] = useState(false)
  const [statusCreateJobsScript, setStatusCreateJobsScript] = useState(false)
  const [createJobsScriptLoading, setCreateJobsScriptLoading] = useState(false)

  useEffect(() => {
    testAPIStatus()
    testConnexionKazeERP()
    testKazeCredentials()
    getCreateJobsScriptStatus()
    getGetJobsScriptStatus()
  })

  const testAPIStatus = async () => {
    setApiStatusLoading(true)
    //wait for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      console.log(process.env.KAZE_API_URL)
      const response = await fetch(process.env.KAZE_API_URL || 'http://localhost:3000/')
      const data = await response.json()
      if(data.status === 'ok') setApiStatus(true)
      else {
        setApiStatus(false)
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white'
          ),
          title: "Erreur",
          description: "Le serveur Kaze API est inaccessible",
          variant: "destructive",
          duration: 8000,
          
        });
      } 
    } catch (error) {
      console.error('Error:', error)
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white'
        ),
        title: "Erreur",
        description: "Le serveur Kaze API est inaccessible",
        variant: "destructive",
        duration: 8000,
        
      });
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
      else {
        setApiErpStatus(false)
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white'
          ),
          title: "Erreur",
          description: "La connexion à l'ERP est impossible",
          variant: "destructive",
          duration: 8000,
          
        });
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white'
        ),
        title: "Erreur",
        description: "La connexion à l'ERP est impossible",
        variant: "destructive",
        duration: 8000,
        
      });
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
      else {
        setKazeCredentialsStatus(false)
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white'
          ),
          title: "Erreur",
          description: "La connexion à Kaze est impossible: Vos identifiants sont incorrects",
          variant: "destructive",
          duration: 8000,
          
        });
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-500 text-white'
        ),
        title: "Erreur",
        description: "La connexion à Kaze est impossible",
        variant: "destructive",
        duration: 8000,
        
      });
      setKazeCredentialsStatus(false)
    }
    setKazeCredentialsLoading(false)
  }

  const getCreateJobsScriptStatus = async () => {
    setCreateJobsScriptLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const response = await fetch(`${process.env.KAZE_API_URL}/v1/scripts/statusCreateJobs`)
      const data = await response.json()
      if(data.status == "success") setStatusCreateJobsScript(true)
      if(data.status == "warning") {
        setStatusCreateJobsScript(false)
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-orange-500 text-white'
          ),
          title: "Attention",
          description: data.message,
          variant: "destructive",
          duration: 8000,
          
        });
      }

    } catch (error) {
      console.error('Error:', error)
      setStatusCreateJobsScript(false)
    }
    setCreateJobsScriptLoading(false)
  }

  const getGetJobsScriptStatus = async () => {
    setGetJobsScriptLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const response = await fetch(`${process.env.KAZE_API_URL}/v1/scripts/statusGetJobs`)
      const data = await response.json()
      if(data.status == 'success') setStatusGetJobsScript(true)
      if(data.status == 'warning') {
        setStatusGetJobsScript(false)
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-orange-500 text-white'
          ),
          title: "Attention",
          description: data.message,
          variant: "destructive",
          duration: 8000,
          
        });
      } 
      
    } catch (error) {
      console.error('Error:', error)
      setStatusGetJobsScript(false)
    }
    setGetJobsScriptLoading(false)
  }



  return (
    <div>
      <Header title="Accueil" subtitle="Console d'administration ERP - KAZE" />
      <div className='mt-8 w-[800px]  bg-blue-100 h-80 rounded-md shadow-xl p-6 flex justify-between'>
        <div className='flex flex-col gap-8 justify-center'>
          <div className='flex items-center'>
            <button onClick={testAPIStatus} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
            <h2 className='font-bold'>Connexion à l&apos;API :</h2>
            {apiStatusLoading &&  <BiLoaderAlt size={26} className='animate-spin ml-4' /> }
            {apiStatus && !apiStatusLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
            {!apiStatus && !apiStatusLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
          </div>

          <div className='flex items-center'>
            <button onClick={testConnexionKazeERP} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
            <h2 className='font-bold'>Connexion à l&apos;ERP : </h2>
            {connexionKazeERPLoading && <BiLoaderAlt size={26} className='animate-spin ml-4' />}
            {apiErpStatus && !connexionKazeERPLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
            {!apiErpStatus && !connexionKazeERPLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
          </div>

          <div className='flex items-center'>
            <button onClick={testKazeCredentials} className='mr-4 bg-primary-400 text-white px-4 py-2 rounded-md hover:bg-primary-100'>Tester</button>
            <h2 className='font-bold'>Connexion à Kaze : </h2>
            {kazeCredentialsLoading && <BiLoaderAlt size={26} className='animate-spin ml-4' />}
            {kazeCredentialsStatus && !kazeCredentialsLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
            {!kazeCredentialsStatus && !kazeCredentialsLoading && <GrStatusWarning size={26} className='ml-4 text-red-500' />}
          </div>
        </div>

        <div className='flex flex-col gap-8 justify-center'>
          <div className='flex items-center'>
            <button onClick={getCreateJobsScriptStatus} className='mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400'>Tester</button>
            <h2 className='font-bold'>Script de création des Missions : </h2>
            {createJobsScriptLoading && <BiLoaderAlt size={26} className='animate-spin ml-4' />}
            {statusCreateJobsScript && !createJobsScriptLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
            {!statusCreateJobsScript && !createJobsScriptLoading && <GrStatusWarning size={26} className='ml-4 text-orange-500' />}
          </div>

          <div className='flex items-center'>
            <button onClick={getGetJobsScriptStatus} className='mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400'>Tester</button>
            <h2 className='font-bold'>Script de récupération des Missions : </h2>
            {getJobsScriptLoading && <BiLoaderAlt size={26} className='animate-spin ml-4' />}
            {statusGetJobsScript && !getJobsScriptLoading && <GrStatusGood size={26} className='ml-4 text-green-500' />}
            {!statusGetJobsScript && !getJobsScriptLoading && <GrStatusWarning size={26} className='ml-4 text-orange-500' />}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home
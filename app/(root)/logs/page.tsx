"use client";
import Header from '@/components/shared/Header'
import React, { useEffect, useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import { TfiNewWindow } from "react-icons/tfi";
import { FcFullTrash } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

const Logs = () => {

  const URL = process.env.KAZE_API_URL + '/v1/logs'
  const [loading, setLoading] = useState(true)
  const [historyLoading, setHistoryLoading] = useState(true)
  const [errorsLoading, setErrorsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errorsLogs, setErrorsLogs] = useState("")
  const [historyLogs, setHistoryLogs] = useState("")
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("")
  const [openHistoryDeleteDialog, setOpenHistoryDeleteDialog] = useState(false);
  const [openErrorsDeleteDialog, setOpenErrorsDeleteDialog] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getHistoryLogs()
    getErrorsLogs()
    setLoading(false)
  }, [])

  const getHistoryLogs = async () => {
    setHistoryLoading(true)
    try {
      const response = await fetch(URL + '/history')
      const data = await response.json()
      //transform date format 2024-01-10T10:32:52.660Z to 2024-01-10 10:32:52 in color blue
      let logs = data.replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).\d{3}Z/g, '<span class="text-blue-500">$1 $2</span>');
      //replace [createJobsScript] with color green and [getJobsScript] with color orange
      logs = logs.replace(/\[createJobsScript\]/g, '<span class="text-orange-600">[createJobsScript]</span>');
      logs = logs.replace(/\[getJobsScript\]/g, '<span class="text-orange-400">[getJobsScript]</span>');
      //replace 6 number with color red
      logs = logs.replace(/\d{10}/g, '<span class="text-purple-500">$&</span>');
      //replace ae00ebad-a426-4147-9255-22f24ca2f32a format with color red
      logs = logs.replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/g, '<span class="text-red-500">$&</span>');
      setHistoryLogs(logs)
      setHistoryLoading(false)
    } catch (error: any) {
      console.error('Error:', error)
      setError(error)
      setHistoryLoading(false)
    }
  }

  const getErrorsLogs = async () => {
    setErrorsLoading(true)
    try {
      const response = await fetch(URL + '/errors')
      const data = await response.json()
      //replace "timestamp":"2024-01-15T14:56:06.308Z" with color blue
      let logs = data.replace(/("timestamp":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z")/g, '<span class="text-blue-500">$1</span>');
      //replace :"error" with color red
      logs = logs.replace(/("error")/g, '<span class="text-red-500">$1</span>');
      //replace content between " "  format "message":"example of message" with color purple
      logs = logs.replace(/("message":")(.+?)(")/g, '<span class="text-blue-700">$1$2$3</span>');
      setErrorsLogs(logs)
      setErrorsLoading(false)
    } catch (error: any) {
      console.error('Error:', error)
      setError(error)
      setErrorsLoading(false)
    }
  }

  


  const showHistoryLogsInFullWindow = () => {
    //open a dialog with the history logs
    setDialogContent(historyLogs);
    setShowDialog(true);
  }

  const showErrorLogsInFullWindow = () => {
    //open a dialog with the error logs
    setDialogContent(errorsLogs);
    setShowDialog(true);
    
  }

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const deleteHistoryLogs = async ({ date }: {date: Date}) => {
    try {
      const response = await fetch(URL + '/history', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      })
      const data = await response.json()
      console.log('Success:', data)
      getHistoryLogs()
    } catch (error: any) {
      console.error('Error:', error)
      setError(error)
    }
  }

  const deleteErrorsLogs = async ({ date }: {date: Date}) => {
    try {
      const response = await fetch(URL + '/errors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      })
      const data = await response.json()
      console.log('Success:', data)
      getErrorsLogs()
    } catch (error: any) {
      console.error('Error:', error)
      setError(error)
    }
  }
  
  const handleSetDate = (date: Date) => {
    console.log('date:', date)
    setDate(date)
  }
  

  return (
    <div>
      <Header title="Logs" subtitle="Administration des Logs" />
      {loading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
      <div className='flex gap-6 justify-center w-full'>
        <div className=' mt-8 bg-blue-100 max-w-full h-[1000px] min-w-[800px] w-fit rounded-md shadow-xl p-6'>
          <div className='flex flex-col h-full'>
            <div className='w-full flex justify-between items-center'>
              <h4 className='font-semibold italic p-2'>History.log</h4>
              {historyLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
              <div className='flex gap-2 items-center'>
                <TfiNewWindow className='cursor-pointer' title='Open in new window' size={22} onClick={showHistoryLogsInFullWindow} />
                <GrRefresh className='cursor-pointer' title='Refresh' size={22} onClick={getHistoryLogs} />
                <FcFullTrash className='cursor-pointer' title='Clear' size={22} onClick={()=> setOpenHistoryDeleteDialog(true)} />
              </div>
            </div>
            <pre 
              className='bg-gray-100 rounded-md shadow-md overflow-auto h-full w-full'
              dangerouslySetInnerHTML={{ __html: historyLogs }}>
            </pre>
          </div>
        </div>
        <div className=' mt-8 bg-blue-100 max-w-full h-[1000px] min-w-[800px] w-fit rounded-md shadow-xl p-6'>
          <div className='flex flex-col h-full'>
            <div className='w-full flex justify-between items-center'>
              <h4 className='font-semibold italic p-2'>Error.log</h4>
              {errorsLoading && <div className='ml-4 font-semibold italic'> Chargement... </div>}
              <div className='flex gap-2 items-center'>
                <TfiNewWindow className='cursor-pointer' title='Open in new window' size={22} onClick={showErrorLogsInFullWindow} />
                <GrRefresh className='cursor-pointer' title='Refresh' size={22} onClick={getErrorsLogs} />
                <FcFullTrash className='cursor-pointer' title='Clear' size={22} onClick={() => setOpenErrorsDeleteDialog(true)} />
              </div>
            </div>
            <pre 
              className='bg-gray-100 rounded-md shadow-md overflow-auto h-full w-full'
              dangerouslySetInnerHTML={{ __html: errorsLogs }}>
            </pre>
          </div>
        </div>
      </div>

      {showDialog && (
        <FullScreenDialog
          logs={dialogContent}
          onClose={handleCloseDialog}
        />
      )}

      {openHistoryDeleteDialog && (
        <DeleteDialog
          open={openHistoryDeleteDialog}
          onClose={() => setOpenHistoryDeleteDialog(false)}
          onConfirm={() => deleteHistoryLogs({ date: date })}
          handleSetDate={handleSetDate}
        />
      )}

      {openErrorsDeleteDialog && (
        <DeleteDialog
          open={openErrorsDeleteDialog}
          onClose={() => setOpenErrorsDeleteDialog(false)}
          onConfirm={() => deleteErrorsLogs({ date: date })}
          handleSetDate={handleSetDate}
        />
      )}

      
    </div>
  )
}


const FullScreenDialog = ({ logs, onClose }: { logs: string, onClose: () => void }) => {
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white w-[90%] h-[90%] rounded-md shadow-xl p-6'>
        <div className='flex justify-between items-center'>
          <h4 className='font-semibold italic p-2'> Logs </h4>
          <IoCloseSharp className='cursor-pointer' title='Close' size={30} onClick={onClose} />
        </div>
        <pre 
          className='bg-gray-100 rounded-md shadow-md overflow-auto h-full w-full'
          dangerouslySetInnerHTML={{ __html: logs }}>
        </pre>
      </div>
    </div>
  )
}


const DeleteDialog = ({ open, onClose, onConfirm, handleSetDate }: { open: boolean, onClose: () => void, onConfirm: () => void, handleSetDate: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
    handleSetDate(new Date());
  }, [open])

  const Confirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error: any) {
      console.error('Error:', error)
      setError(error)
    }
    setLoading(false);
  }

  const handleDateChange = (e: any) => {
    setDate(new Date(e.target.value));
    handleSetDate(new Date(e.target.value));
  }

  
  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white w-[600px] h-[400px] rounded-md shadow-xl p-6'>
        <div className='flex justify-between items-center'>
          <h4 className='font-semibold italic p-2'> Suppression des logs </h4>
          <IoCloseSharp className='cursor-pointer' title='Close' size={30} onClick={onClose} />
        </div>
        <div className='flex flex-col gap-4 items-center'>
          <p>Etes vous sûr de vouloir supprimer les logs avant cette date ?</p>
          <input 
            type='datetime-local' 
            value={date.toISOString().slice(0, 16)} 
            onChange={handleDateChange}
            className='p-2 rounded-md border border-gray-300' 
          />
          <div className='flex gap-4'>
            <button 
              className='bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600'
              onClick={onClose}
            >
              Retour
            </button>
            <button 
              className='bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600'
              onClick={Confirm}
            >
              {loading ? 'Chargement...' : 'Confirmer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Logs
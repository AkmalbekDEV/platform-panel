import { Button, FormControl, FormLabel, Input, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { PiArrowSquareLeft } from 'react-icons/pi'

const Books = () => {
    const [name, setName] = useState("")
    const [img, setImg] = useState("")
    const [pdf, setPdf] = useState("")
    const [books, setBooks] = useState([])
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const response = await axios.get('https://7b763fe74e4b87ba.mokky.dev/books')
            setBooks(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`https://7b763fe74e4b87ba.mokky.dev/books/${id}`)
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            console.log(error);
        }
        toast({
            duration: 5000,
            isClosable: true,
            status: "success",
            position: "top",
            title: "O'chirildi!"
        })
    }

    const handleAdd = async () => {
        if (!name || !img || !pdf || !img.includes("https") || !pdf.includes("https")) {
            toast({
                duration: 6000,
                isClosable: true,
                status: "error",
                position: "top",
                title: "Barcha joylarni TO'G'RI to'ldiring!",
            })
            return;
        }

        try {
            const res = await axios.post('https://7b763fe74e4b87ba.mokky.dev/books', {
                name: name,
                img: img,
                link: pdf,
            })
            setBooks((prevBooks) => [...prevBooks, res.data]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <motion.div 
            className='min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center relative'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Orqaga qaytish tugmasini yuqoriga va markazga joylashtiramiz */}
            <motion.div 
                className='absolute top-5 left-5'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <PiArrowSquareLeft size={50} cursor={'pointer'} onClick={() => navigate('/')} className="text-white" />
            </motion.div>

            <motion.div
                className='grid mb-10 pt-10 content-start gap-10 px-16 max-md:px-10 h-[85%] overflow-y-scroll'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
            >
                <motion.div 
                    className='text-center'
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='text-5xl font-medium tracking-wide text-white'>Kitoblar</h1>
                    <p className='text-xl text-gray-400 mt-4'>Bu yerda siz bilim darajangizni oshirishga yordam beradigan kitoblarni topishingiz mumkin</p>
                </motion.div>
                
                <motion.div 
                    className='flex items-center flex-wrap justify-center gap-8 mt-8'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    {books && books.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className='relative p-5 w-[300px] h-[400px] rounded-3xl shadow-lg bg-gray-800 border-2 border-gray-300 transition-all hover:shadow-xl text-white'
                            whileHover={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)" }}
                        >
                            <Link to={item.link} className='w-[85%]' target='_blank'>
                                <img src={item.img} alt="book" className='h-[85%] w-full object-cover rounded-lg' />
                            </Link>
                            <Button 
                                onClick={() => handleDelete(item.id)} 
                                mt={4} 
                                w={'full'} 
                                colorScheme='red' 
                                className='relative z-10'
                            >
                                O'chirish
                            </Button>
                            <motion.div 
                                className='absolute inset-0 bg-gray-900 opacity-0 hover:opacity-25 transition-opacity duration-300 rounded-3xl z-0'
                            ></motion.div>
                        </motion.div>
                    ))}

                    {/* Kitob qo'shish modali */}
                    <motion.div 
                        onClick={onOpen} 
                        className='cursor-pointer w-[300px] h-[400px] rounded-3xl bg-gray-700 flex items-center justify-center border-2 border-gray-400 hover:bg-gray-800 transition-all relative overflow-hidden'
                        whileHover={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)" }}
                    >
                        <BiPlusCircle size={50} className="text-white" />
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Yangi kitob</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <form>
                                        <FormLabel>Kitob nomi</FormLabel>
                                        <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder='Kitob nomi...' />
                                        <FormLabel className='mt-3'>Rasm linki</FormLabel>
                                        <Input required value={img} onChange={(e) => setImg(e.target.value)} placeholder='Rasm linki...' />
                                        <FormLabel className='mt-3'>PDF linki</FormLabel>
                                        <Input required value={pdf} onChange={(e) => setPdf(e.target.value)} placeholder='Google Drive link...' />
                                        <Button w={'full'} my={5} onClick={handleAdd} colorScheme='blue'>Qo'shish</Button>
                                    </form>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                        <motion.div 
                            className='absolute inset-0 bg-gray-900 opacity-0 hover:opacity-25 transition-opacity duration-300 rounded-3xl'
                        ></motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Books;
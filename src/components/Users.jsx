import React, { useEffect, useState } from 'react';
import { BiEdit, BiPlusCircle, BiTrash } from 'react-icons/bi';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  useToast,
  VStack,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ fullName: '', email: '' });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get('https://7b763fe74e4b87ba.mokky.dev/users');
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (id) => {
    try {
      await axios.patch(`https://7b763fe74e4b87ba.mokky.dev/users/${id}`, {
        paymentStatus: true,
      });
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top',
        title: 'Ruxsat berildi!',
      });
      getData(); // Refresh data
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (id) => {
    try {
      await axios.patch(`https://7b763fe74e4b87ba.mokky.dev/users/${id}`, {
        paymentStatus: false,
      });
      toast({
        duration: 5000,
        isClosable: true,
        status: 'error',
        position: 'top',
        title: 'Bloklandi!',
      });
      getData(); // Refresh data
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://7b763fe74e4b87ba.mokky.dev/users/${id}`);
      toast({
        duration: 5000,
        isClosable: true,
        status: 'info',
        position: 'top',
        title: 'Foydalanuvchi o\'chirildi!',
      });
      getData(); // Refresh data
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('https://7b763fe74e4b87ba.mokky.dev/users', newUser);
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top',
        title: 'Yangi foydalanuvchi qo\'shildi!',
      });
      setNewUser({ fullName: '', email: '' }); // Reset form
      onClose(); // Close modal
      getData(); // Refresh data
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="flex items-center mb-8">
        <BsArrowLeftCircle
          size={50}
          className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-300"
          onClick={() => navigate('/')}
        />
        <Text className="text-4xl font-bold text-white ml-4">Foydalanuvchilar</Text>
      </div>
      <div className="flex flex-wrap gap-6">
        {data.map((item, index) => (
          <Popover key={index} placement="right">
            <PopoverTrigger>
              <Box
                className="w-[310px] h-[80px] bg-gray-800 text-white rounded-xl shadow-lg flex items-center justify-between px-6 py-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <Text className="text-xl font-medium">{item.fullName}</Text>
                <BiEdit size={30} className="text-blue-500 hover:text-blue-300 transition-colors duration-300" />
              </Box>
            </PopoverTrigger>
            <PopoverContent
              className="bg-gray-800 text-white border border-gray-700"
              bgColor={"gray.800"}
              borderColor="gray.700"
              width="max-content"
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader className="text-xl font-semibold">Tasdiqlash</PopoverHeader>
              <PopoverBody display="flex" gap={4} p={4}>
                <Button
                  onClick={() => handleBlock(item.id)}
                  colorScheme="red"
                  variant="solid"
                >
                  Bloklash
                </Button>
                <Button
                  onClick={() => handleSubmit(item.id)}
                  colorScheme="green"
                  variant="solid"
                >
                  Ruxsat berish
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  colorScheme="gray"
                  leftIcon={<BiTrash />}
                >
                  O'chirish
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
        <Box
          onClick={onOpen} // Open the modal on click
          className='w-[310px] h-[80px] bg-gray-700 text-white rounded-xl shadow-lg flex items-center justify-center px-6 py-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer'>
          <BiPlusCircle size={40} />
        </Box>
      </div>

      {/* Modal for Adding New User */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={'gray.700'} textColor={'white'}>
          <ModalHeader>Yangi Foydalanuvchi Qo'shish</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddUser}>
              Qo'shish
            </Button>
            <Button onClick={onClose}>Bekor qilish</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Users;
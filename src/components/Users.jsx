import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
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
} from '@chakra-ui/react';
import axios from 'axios';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
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
    } catch (error) {
      console.log(error);
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
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default Users;
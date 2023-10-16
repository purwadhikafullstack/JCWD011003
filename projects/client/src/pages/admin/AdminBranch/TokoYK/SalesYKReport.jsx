import React from 'react'
import { Box, Heading } from "@chakra-ui/react";
import TransactionListYk from '../../../../components/admin/TransactionListYk';
import TransactionGraphYk from '../../../../components/admin/TransactionGraphYk';


const SalesYKReport = () => {
  return (
    <>
    <Box p={4}>
        <Heading mb={6}>Report Management</Heading>
        <Box>
          <TransactionGraphYk />
        </Box>
        <Box boxShadow={"lg"} mt={2}>
          <TransactionListYk   />
        </Box>
      </Box>
    </>
  )
}

export default SalesYKReport
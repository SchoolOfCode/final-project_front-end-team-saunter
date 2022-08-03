import {useState, useEffect, useCallback} from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import page2image from "../public/assets/inputpageimage.avif";

import { Box, ChakraProvider, FormControl, FormLabel, Select } from '@chakra-ui/react'
import styles from "../styles/Inputpage.module.css"

export default function GetStarted() {
  const [budget, setBudget] = useState(null)
  const [energy, setEnergy] = useState(null)
  const router = useRouter()
  
  function sendingResults(){
    let selectedLocation = "London"
    let selectedBudget = budget
    let selectedEnergy = energy
    router.push(
      {
        pathname: `/results`,
        query: {selectedLocation, selectedBudget, selectedEnergy}
      }
      )}

  return (
    <div>
      <Head>
        <title>Saunter | Get-Started</title>
      </Head>

      <div className={styles.form}>
        <div className={styles.imgcontainer}>
          <Image
            className={styles.pagetwoimg}

            // src="/../public/assets/inputpageimage.avif"
            src={page2image}

            alt="inputpage image"
            height = "530%"
            width= "400%"
          />
        </div>
  
        <ChakraProvider>
          <Box
            width="30vw"
            borderColor="#FF8F7780"
            borderStyle="solid"
            borderWidth="4px"
            padding="6"
            borderRadius="2rem"
          >
            <FormControl>
              <FormLabel>Where do you want to travel to?</FormLabel>
              <Select placeholder="Select Location">
                <option>London</option>
              </Select>

              <FormLabel>What is your budget?</FormLabel>
              <Select placeholder='Select Budget' value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>

              <FormLabel>What is your energy level?</FormLabel>
              <Select placeholder='Select energy level' value={energy} onChange={(e) => setEnergy(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>

              <button className="btn" onClick={sendingResults}>
                Create Day Plan
              </button>
            </FormControl>
          </Box>
        </ChakraProvider>
      </div>
    </div>

  );
}


'use client'

import { Container } from '@/components'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { useState } from 'react'
import { AddCrypto } from '@/components/add-crypto'

export default function PortfolioPage()  {
  const [show, setShow] = useState(false)
  return (
    <Container className={'pt-0 mb-20'}>
      <CryptoTableHeader/>
      <div className={'flex flex-col items-center justify-center mt-24'}>
        <AiOutlineAppstoreAdd className={'w-36 h-36 mb-3.5'}/>
        <AddCrypto/>
      </div>
    </Container>
  );
};

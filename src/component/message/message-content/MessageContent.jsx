import { Send } from '@mui/icons-material'
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Input } from '@mui/material'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import s from './messageContent.module.scss'

const MessageContent = () => {
  const containerRef = useRef(null);

  const handleClose = () => {}

  const scrollToBottom = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);


  return (
    <div className={clsx(s.container)}>
        <span className={clsx(s.shopName)}>Shop Name</span>
        <div className={clsx(s.messageContent)}>
            <ul className={clsx(s.messageList)} ref={containerRef} >
                <li className={clsx(s.messageItem)}>
                  <div className={clsx(s.messageData)}>                    
                  The first value is the horizontal position and the second value is the vertical. The top left corner is 0% 0%. The right bottom corner is 100% 100%. If you only specify one value, the other value will be 50%. Default value is: 0% 0%
                    <span className={clsx(s.messageTime)}>17th 5 2023</span>
                  </div>
                </li>
                <li className={clsx(s.messageItemSelf)}>
                  <div className={clsx(s.messageData)}>                    
                  Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
                  </div>
                  <span className={clsx(s.messageTime)}>17th 5 2023</span>
                </li>
                <li className={clsx(s.messageItemSelf)}>
                  <div className={clsx(s.messageData)}>                    
                  Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
                  </div>
                  <span className={clsx(s.messageTime)}>17th 5 2023</span>
                </li>
                <li className={clsx(s.messageItemSelf)}>
                  <div className={clsx(s.messageData)}>                    
                  Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
                  </div>
                  <span className={clsx(s.messageTime)}>17th 5 2023</span>
                </li>
                <li className={clsx(s.messageItem)}>
                  <div className={clsx(s.messageData)}>                    
                  The first value is the horizontal position and the second value is the vertical. The top left corner is 0% 0%. The right bottom corner is 100% 100%. If you only specify one value, the other value will be 50%. Default value is: 0% 0%
                    <span className={clsx(s.messageTime)}>17th 5 2023</span>
                  </div>
                </li>
            </ul>
        </div>
        <div className={clsx(s.wrapperInputSend)}>
           <div className={clsx(s.inputBox)}>
              <Input className={clsx(s.inputSend)} placeholder='Enter message here'></Input>
           </div>
          <Send className={clsx(s.sendIcon)}></Send>
        </div>
    </div>
  )
}

export default MessageContent

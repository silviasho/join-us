import React, { useEffect } from 'react';
import { Segment, Input, Icon, Button } from 'semantic-ui-react';
import io from 'socket.io-client';
let socket

export default function MessageForm() {
  
    useEffect(
        () => {
            socket = io('http://localhost:2002')
          
        }, []
    );

    return (
        <Segment className='message__form'>
            <Input
                fluid
                name='message'
                style={{ marginBottom: '0.7em' }}
                label={<Button Icon={'add'} />}
                labelPosition='left'
                placeholder='wtite your message'
            />
            <Button.Group icon widths='1'>
                <Button
                    color='orange'
                    content='add reply'
                    labelPosition='left'
                    icon='edit'
                />
                <Button
                    color='teal'
                    content='upload media'
                    labelPosition='right'
                    icon='cloud upload'
                />
            </Button.Group>
        </Segment>

    )
}

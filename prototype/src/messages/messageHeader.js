import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';

export default function MessageHeader() {


    return (
        <Segment clearing>
            <Header fluid='true' as='h3' floated='left' style={{ marginBottom: 0 }}>
                <span>
                    JOIN US CHAT
                    <Icon name={'star outline'} color='black' />
                </span>
            </Header>
            <Header floated='right'>
                <Input
                    size='mini'
                    icon='search'
                    name='searchText'
                    placeholder='search message'
                />
            </Header>
        </Segment>

    )
}

// @flow

export default {
  ExampleSource: 'https://fake.com/1.json',
  Name: 'Colombo_Intercity_Driver_dispatch',
  Comment: 'Send SMS message to accept trip',
  Version: 1,
  Domain: '//Domain',
  Id: '//Domain/Dispatch',
  StartAt: 'Init',
  AllowReentry: true,
  States: {
    Init: {
      Type: 'Terminator',
      Resource: 'k://demand_job-assigned',
      ResultPath: '$.event',
      Next: 'Check City and Vehicle View',
    },
    'Check City and Vehicle View': {
      Type: 'Choice',
      InputPath: '$.event',
      Choices: [
        {
          And: [
            {
              Variable: '$.region.id',
              NumberEquals: 478,
            },
            {
              Variable: '$.vehicleViewId',
              NumberEquals: 99999999,
            },
          ],
          Next: 'SMS for Dispatch accepted',
        },
        {
          And: [
            {
              Variable: '$.region.id',
              NumberEquals: 999,
            },
          ],
          Next: 'SMS for Dispatch denied',
        },
      ],
    },
    'Check Other City': {
      Type: 'Choice',
      InputPath: '$.event',
      Choices: [
        {
          And: [
            {
              Variable: '$.region.id',
              NumberEquals: 478,
            },
          ],
          Next: 'Wait for six hours',
        },
        {
          And: [
            {
              Variable: '$.region.id',
              NumberEquals: 999,
            },
          ],
          Next: 'Wait for twenty four hours',
        },
      ],
    },
    'SMS for Dispatch accepted': {
      Type: 'Pass',
      InputPath: '$.event',
      Result: {
        expirationMinutes: 60,
        fromUserUUID: '55555555-4444-3333-2222-111111111111',
        toUserUUID: 'Eval($.supplyUUID)',
        getSMSReply: false,
        message:
          'Partner, Oba labegena athi mema trip eka Blah trip ekaki, rider wa amatha drop location eka confirm.',
        messageType: 'SEND_SMS',
        priority: 1,
        actionUUID: 'd259c34d-457a-411e-8c93-6edd63a7ddc6',
      },
      ResultPath: '$.actionParam',
      Next: 'Send SMS',
    },
    'SMS for Dispatch denied': {
      Type: 'Pass',
      InputPath: '$.event',
      Result: {
        expirationMinutes: 60,
        fromUserUUID: '55555555-4444-3333-2222-111111111111',
        toUserUUID: 'Eval($.supplyUUID)',
        getSMSReply: false,
        message:
          'Partner, Oba labegena athi mema trip eka Blah trip ekaki, rider wa amatha drop location eka confirm.',
        messageType: 'SEND_SMS',
        priority: 1,
        actionUUID: 'd259c34d-457a-411e-8c93-6edd63a7ddc6',
      },
      ResultPath: '$.actionParam',
      Next: 'Send SMS',
    },
    'Send SMS': {
      Type: 'Task',
      InputPath: '$.actionParam',
      Resource: 'uns://dc/server/Thing::sendSMS',
      InputSchema: {
        '$.expirationMinutes': 'int',
        '$.toUserUUID': 'string',
        '$.fromUserUUID': 'string',
        '$.getSMSReply': 'bool',
        '$.message': 'string',
        '$.messageType': 'string',
        '$.priority': 'int',
        '$.actionUUID': 'string',
      },
      OutputSchema: {
        '$.fraudDriverUUIDs[*]': 'string',
      },
      Next: 'Check Other City',
    },
    'Wait for six hours': {
      Type: 'Wait',
      Seconds: 21600,
      Next: 'Exit',
    },
    'Wait for twenty four hours': {
      Type: 'Wait',
      Seconds: 86400,
      Next: 'Exit',
    },
    Exit: {
      Type: 'Terminator',
      End: true,
    },
  },
};

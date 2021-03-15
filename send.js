#!/usr/bin/env node

const amqp = require('amqplib/callback_api')
const { v4: uuidv4 } = require('uuid')

const amqp_uri = process.env.AMQP_URI || 'amqp://guest:guest@localhost'
const msg_total = 50

amqp.connect(amqp_uri, function(err0, connection) {
  if(err0) {
    throw err0
  }

  connection.createChannel(function(err1, channel) {
    if(err1) {
      throw err1
    }

    const queue = 'antrian_1'
    const msg = uuidv4()

    channel.assertQueue(queue, {
      durable: false
    })

    channel.sendToQueue(queue, Buffer.from(msg))
    console.log(" [x] Sent %s", msg)
  })

  setTimeout(function() {
    connection.close()
    process.exit(0)
  }, 500)
})

#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

const amqp_uri = process.env.AMQP_URI || 'amqp://guest:guest@localhost'

const waiting_secs = 120

amqp.connect(amqp_uri, function(err, connection) {
  connection.createChannel(function(err, channel) {
    const queue = 'antrian_1'

    channel.assertQueue(queue, {
      durable: false
    })

    channel.prefetch(1)

    console.log(" [*] Waiting messages in %s. To exit press CTRL+C", queue)

    channel.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString())
      setTimeout(function() {
        console.log(" [x] Done")
        channel.ack(msg)
      }, waiting_secs * 1000)
    }, {
      noAck: false
    })
  })
})

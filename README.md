# Introduction

There are many chat applications available, such as WhatsApp, Instagram, and Facebook Messenger, which claim to be end-to-end encrypted. However, there's no way to verify this. So, I decided to create an incognito chat application that you can host on your local area network to chat with friends, colleagues, or relatives. This application is likely the lightest chat application available, consisting of only one HTML file and one JavaScript file.


# Usage

Clone the repo and generate a version 4 UUID using any UUID generator. You can use this website https://www.uuidgenerator.net/. Replace the value of topic in mqtt.js with the new UUID and voila you can now run html file to run the chat application. You need to copy this repo with the same UUID in every device on which you want the chat application to run.


# Practical Applications

- You can use this chat application with your homies to share top level secrets
- You can use this chat application to create anonymous polls in your organization
- You can use this chat application to discuss taboo topics at events

# Technologies Used

- Javascript
- MQTT Protocol (HiveMQ Broker)


# Engineering

Let's delve into the engineering aspects of this chat application. To understand its functionality, we first need to learn about the MQTT protocol. In this application, I'm using a public MQTT broker as a central server. Using MQTT protocol for this purpose is not ideal but fun. I'm utilizing MQTT topics for sending and receiving messages.

One limitation of the MQTT protocol is that if you use two topics — one for sending messages and one for receiving messages— you can only create a chat application for two users. If you increase the number of users to three, the number of topics also increases to three, making the system more complex. Each user would need to subscribe to the topics of all other users to receive messages, significantly complicating the application. 

## Big brain moment 1
I came up with the idea of using the same topic for both sending and receiving messages. On the application side, messages are filtered to display only the messages from other users, ensuring that you don't see your own messages.

## Big brain moment 2
As I mentioned earlier, I'm using a public broker, which raises the question "How is this application even secure". To address this, I'm using a UUID as the topic name. The interesting aspect of UUIDs is that they are globally unique. To give you an idea of how secure this application is, consider that generating the same UUID again would require three things:

    1-) Access to the web server used to generate the UUID.
    2-) Extraordinary luck.
    3-) A time machine to go back to the exact moment the UUID was generated.

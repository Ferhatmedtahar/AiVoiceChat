/*
first go to https://elevenlabs.io/app/conversational-ai/
create your agent , custimize it, then copy the api key and paste it to .env file

than using the react sdk we can create a voice chat bot
with a custom hook  , conversion = useConversation()
and than we distruct  from it status , isSpeaking


start conversation  
   const conversationId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
      });

End conversation
      await conversation.endSession();

muted  keep state of muted when u click on the button
    await conversation.setVolume({ volume: isMuted ? 1 : 0 });

increase and decrease volume setting a state and adding 0.2 or -0.2
*/

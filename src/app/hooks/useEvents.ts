import { useFormContext } from "react-hook-form";
import { useVerifyResponseScriptMutation } from "../api/eventSlice";

export default function useEvents(){
    function getVerifyResponseScript() {
        const [verifyResponseScriptMutation, { isLoading, isSuccess, error }] =
          useVerifyResponseScriptMutation();
    
        async function verifyResponseScript(command: string, inputMessage: string, script: string) {
          //Usually event.username is the uncapitalized version of a username.
          //Spooder replaces this with the capitalized version in runCommands()
          let testEvent = {
            timestamp: '2022-05-05T17:06:31.505Z',
            command: 'PRIVMSG',
            event: 'PRIVMSG',
            channel: '#testchannel',
            username: 'testchannel',
            displayName: 'TestChannel',
            message: inputMessage,
            tags: {
              badgeInfo: 'subscriber/1',
              badges: { broadcaster: true, subscriber: 0 },
              clientNonce: '00000000000000000000000000000000',
              color: '#1E90FF',
              displayName: 'TestChannel',
              emotes: [],
              firstMsg: '0',
              flags: '',
              id: '00000000-0000-0000-0000-000000000000',
              mod: '0',
              roomId: '000000000',
              subscriber: '1',
              tmiSentTs: '0000000000000',
              turbo: '0',
              userId: '000000000',
              userType: '',
              bits: undefined,
              emoteSets: [],
              username: 'testchannel',
              isModerator: false,
            },
          };
            const fd = new FormData();
            fd.append("command", command);
            fd.append("message", JSON.stringify(testEvent));
            fd.append("script", script);
            const response = await verifyResponseScriptMutation(fd);
            return response;
        }
    
        return { verifyResponseScript, isLoading, isSuccess, error };
      }

    return {getVerifyResponseScript};
}
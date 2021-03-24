import subprocess
import time
import asyncio
import socket
import json
import sys



def send_on_jtag(cmd):
    # this setup will only send chars, if you want to change this,
    # you need to modify the code running on the NIOS II to have
    # the variable prompt accept multiple chars.
    assert len(cmd)==1, "Please make the cmd a single character"



    inputCmd = "nios2-terminal.exe <<< {}".format(cmd);



    # subprocess allows python to run a bash command
    output = subprocess.run(inputCmd, shell=True, executable='/bin/bash', stdout=subprocess.PIPE)
    vals = output.stdout
    vals = vals.decode("utf-8")
    vals = vals.split('<-->')
    return vals[1].strip()
    #return vals



def main():
    #print('Enter character: ')
    #x = input()
    #ticks_0 = time.time()
    #print('Sending Request at: ')
    #print(ticks_0)
    #res = send_on_jtag(x) # example of how to use send_on_jtag function
    #ticks_1 = time.time()
    #print('Receiving Response at: ')
    #print(ticks_1)
    #print('Time Taken: ')
    #print(ticks_1-ticks_0)
    #print(res)



    #host = "18.133.33.249"
    host = sys.argv[1]
    port = 8000
    data = '{"x_pos": 13, "y_pos": -10}'
    print(data)
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect((host, port))
    terrain = "a"
    while True:
        data = send_on_jtag(terrain[0]) # example of how to use send_on_jtag function
        print(data)
        if(data):
            client.send(data.encode())
            terrain = (client.recv(1024)).decode()
            if(terrain =="0"):
                terrain = "a"
            else:
                terrain = "b"

            #terrain.decode()

            #print(terrain)
        else:
            client.close()


if __name__ == '__main__':
    main()

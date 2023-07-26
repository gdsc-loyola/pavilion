from django.shortcuts import render
import random
import string

# Create your views here.

#Can be used to generate Org Account Passwords for strong security
def PasswordGenerator(request):
    ID = []
    symb = ['%','$','#','!','^','&','*','(',')']
    for x in range(13):
        chooser = random.randint(1,2,3)
        if chooser == 1:
            randomizerlet = random.choice(string.ascii_letters)
            x = randomizerlet 
            ID.append(str(x))
        elif chooser == 2:
            randomizernum = random.randint(1,9)
            x = randomizernum
            ID.append(str(x))
        elif chooser == 3:
            randomizersymb = random.choice(symb)
            x = randomizersymb
            ID.append(str(x))

    word = ''.join(ID)
    return word
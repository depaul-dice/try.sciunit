#!/usr/bin/python
import readline
import shlex
import subprocess

allowed = [['date'], ['./hello.sh']]


def f():
    ln = raw_input('> ')
    ls = shlex.split(ln)
    if len(ls) == 2 and ls[0] == 'echo':
        subprocess.call(ls)
    elif ls in allowed:
        subprocess.call(ls, shell=True)
    else:
        print 'command forbidden'


def main():
    try:
        while True:
            f()
    except EOFError:
        print


if __name__ == '__main__':
    main()

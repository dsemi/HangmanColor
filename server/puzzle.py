from mod_python import apache
from random import randrange
import os, struct
from base64 import b64encode, b64decode


def encode(value):
    return b64encode(value, "-_").rstrip("=")


def decode(value):
    return b64decode(value + '=' * (4 - len(value) % 4), "-_")


images = {}
image_dir = '/srv/http/images/'


for item in os.listdir(image_dir):
    if item.endswith('.jpg'):
        images['images/'+item] = encode(item[:-4])


def listimages(req):
    req.content_type = 'text/plain'
    req.send_http_header()
    for key, val in images.items():
        req.write('%s: %s\n' % (key, val))
    return len(images.items())


def list_puzzles():
    puzzleList = []
    for key, val in images.iteritems():
	puzzleList.append('http://li244-77.members.linode.com/?im_file=%s\n' % val)
    puzzleList = sorted(puzzleList)
    string = ''.join(puzzleList)
    return string


def key_gen():
    return images.items()[randrange(len(images))][1]


def puzzle_gen(im_file=''):
    if not im_file:
        im_file=images.items()[randrange(len(images))][1]
    for key, val in images.iteritems():
        if im_file == val:
            return key


def soln(req):
    poss_answer = req.form.getfirst('guess').lower()
    filename = req.form.getfirst('filepath')
    decoded_ans = decode(images[filename])
    return poss_answer == decoded_ans or poss_answer.startswith(decoded_ans+' ') or poss_answer.endswith(' '+decoded_ans) or ' '+decoded_ans+' ' in poss_answer


def upl(req):
    try:
        tmpfile = req.form.getfirst('image_to_upload')
        ans = req.form.getfirst('answer').lower()
    except:
        return "no file!"
    html = '''\
    <html>
    <body>
    {0}
    {1}
    </body>
    </html>
    '''
    try:
        with open(image_dir+ans+'.jpg'): pass
        message = 'File already exists<br/>'
    except IOError:
        with open(image_dir+ans+'.jpg', 'w+') as f:
            f.write(tmpfile.value)
            message = 'File uploaded successfully<br/>'
    url = '<a href="http://li244-77.members.linode.com/?im_file='+encode(ans)+'">Link to puzzle</a>'
    return html.format(message, url)




import logging

import os
from flask import Flask, request
from subfind import parse_release_name, SubFind
from subfind.event import EventManager
from subfind_web.api import api
from subfind_web.crossdomain import crossdomain

app = Flask(__name__)

languages = ['vi']
providers = ['subscene']
# providers = ['opensubtitles', 'subscene']
force = False
remove = False
# ignore files less than 500 MB
min_movie_size = 500 * 1024 * 1024
max_sub = 5
src_dirs = ["/data2/movies"]

event_manager = EventManager()

sub_finder = SubFind(event_manager, languages=languages, provider_names=providers, force=force, remove=remove,
                     min_movie_size=min_movie_size, max_sub=max_sub)

movie_requests = sub_finder.build_download_requests_for_movie_dirs(src_dirs)

data = []
for release_name, movie_dir, langs in movie_requests:
    item = {
        'name': release_name,
        'src': movie_dir,
        'languages': langs
    }

    item.update(parse_release_name(item['name']))

    data.append(item)

data = sorted(data, key=lambda x: x['name'])


# print(data)

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/release")
@crossdomain(origin='*')
@api
def release():
    # print(data)
    # print(movie_requests)
    #
    # data = [
    #     {'name': 'Avengers.Age.of.Ultron.2015.1080p.BluRay.x264.YIFY'}
    # ]

    # for item in data:
    #     item.update(parse_release_name(item['name']))

    return data


@crossdomain(origin='*')
@app.route("/config")
@api
def get_config():
    return {
        'src': src_dirs,
        'lang': languages,
        'force': force,
        'remove': remove,
        'max-sub': max_sub
    }


@app.route("/release/download")
@crossdomain(origin='*')
def release_download():
    movie_dir = request.args.get('dir')

    sub_finder.scan_movie_dir(movie_dir)

    return 'Completed'


if __name__ == "__main__":
    from tornado import autoreload
    from tornado.wsgi import WSGIContainer
    from tornado.httpserver import HTTPServer
    from tornado.ioloop import IOLoop

    DEFAULT_APP_TCP_PORT = 5000

    logging.basicConfig(level=logging.DEBUG,
                        format='%(asctime)s %(levelname)s %(message)s', )

    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(DEFAULT_APP_TCP_PORT)
    ioloop = IOLoop.instance()
    autoreload.start(ioloop)

    root_dir = os.path.abspath(os.path.dirname(__file__))
    # watch(join(root_dir, 'data/postgresql'))
    # watch(join(root_dir, 'generated'))

    ioloop.start()

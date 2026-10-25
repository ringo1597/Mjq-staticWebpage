#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
自定义背景音乐工具
==================

用法
----
1. 把你合法获取的音频文件（mp3 / m4a / wav / flac / ogg / aac）放进
   ``assets/music_sel/`` 目录
2. 运行：

       python addmusic.py            # 自动扫描目录并生成清单
       python addmusic.py "歌名.mp3" # 只添加指定文件
       python addmusic.py --clear    # 清空自定义清单（保留默认曲库）

运行后会自动更新：
   - ``data/music_custom.json``   自定义曲目清单
   - ``assets/data.js``           内联数据（保证 file:// 直接打开也能用）

网页会自动读取清单并把这些曲目加入背景音乐轮播。

关于版权
--------
请只使用你**自己合法获得**的音频（例如购买的专辑、在官方平台已购的曲目、
公版录音、或明确标注可自由使用的音乐）。
把他人受版权保护的商业录音打包进网页再分发给第三方，可能涉及侵权。
"""

import json
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
MUSIC_DIR = os.path.join(BASE, 'assets', 'music_sel')
DATA_JSON = os.path.join(BASE, 'data', 'music_custom.json')
DATA_JS = os.path.join(BASE, 'assets', 'data.js')
MAIN_JSON = os.path.join(BASE, 'data', 'music.json')

AUDIO_EXT = ('.mp3', '.m4a', '.aac', '.ogg', '.wav', '.flac')

# 默认曲库文件名（不当作自定义曲目）
DEFAULT_NAMES = {'track_250.mp3', 'track_443.mp3', 'track_493.mp3',
                  'track_587.mp3', 'track_657.mp3', 'track_970.mp3'}


def display_name(filename: str) -> str:
    """去掉扩展名，把下划线/连字符换成空格"""
    stem = os.path.splitext(filename)[0]
    stem = re.sub(r'[_]+', ' ', stem)
    stem = re.sub(r'\s+', ' ', stem).strip()
    return stem


def load_main_music():
    try:
        with open(MAIN_JSON, encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return []


def scan(directory: str, only=None):
    """扫描目录，返回自定义曲目清单"""
    result = []
    if not os.path.isdir(directory):
        return result

    files = sorted(os.listdir(directory))
    if only:
        wanted = {os.path.basename(p) for p in only}
        files = [f for f in files if f in wanted]

    for fn in files:
        if not fn.lower().endswith(AUDIO_EXT):
            continue
        if fn in DEFAULT_NAMES:
            continue
        path = os.path.join(directory, fn)
        if not os.path.isfile(path):
            continue
        size = os.path.getsize(path)
        if size < 1024:      # 跳过无效小文件
            continue
        rel = 'assets/music_sel/' + fn
        result.append({
            'id': os.path.splitext(fn)[0],
            'file': rel,
            'name': display_name(fn),
            'mood': 'From You',
            'bytes': size,
        })
    return result


def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def sync_data_js(custom):
    """把自定义曲目同步进 assets/data.js 的内联数据"""
    gallery = []
    videos = []
    music = load_main_music()
    try:
        with open(os.path.join(BASE, 'data', 'gallery.json'), encoding='utf-8') as f:
            gallery = json.load(f)
    except Exception:
        pass
    try:
        with open(os.path.join(BASE, 'data', 'videos.json'), encoding='utf-8') as f:
            videos = json.load(f)
    except Exception:
        pass

    out = ('// 本地内联数据（保证 file:// 直接双击打开也能正常显示，不受 CORS 限制）\n'
           'window.SITE_DATA = {\n')
    out += '  gallery: ' + json.dumps(gallery, ensure_ascii=False, indent=2) + ',\n'
    out += '  videos: ' + json.dumps(videos, ensure_ascii=False, indent=2) + ',\n'
    out += '  music: ' + json.dumps(music, ensure_ascii=False, indent=2) + ',\n'
    out += '  musicCustom: ' + json.dumps(custom, ensure_ascii=False, indent=2) + '\n'
    out += '};\n'
    with open(DATA_JS, 'w', encoding='utf-8') as f:
        f.write(out)


def main():
    args = sys.argv[1:]

    if args and args[0] == '--clear':
        write_json(DATA_JSON, [])
        sync_data_js([])
        print('已清空自定义曲目清单（默认曲库保留）。')
        return

    print('扫描目录:', MUSIC_DIR)
    only = None
    if args:
        only = [os.path.join(MUSIC_DIR, a) if os.path.sep in a or a.endswith(AUDIO_EXT)
                else os.path.join(MUSIC_DIR, a) for a in args]
        # 若用户直接写了扩展名，就按文件名匹配
        only = [a for a in args]

    custom = scan(MUSIC_DIR, only)

    if not custom:
        print('\n没有发现新的音频文件。')
        print('请先把音频放进这个目录：')
        print('  ' + MUSIC_DIR)
        print('支持的格式：' + ', '.join(AUDIO_EXT))
        return

    write_json(DATA_JSON, custom)
    sync_data_js(custom)

    print('\n已添加 %d 首自定义曲目：' % len(custom))
    for c in custom:
        print('  · %-28s  %6.1f MB' % (c['name'], c['bytes'] / 1024 / 1024))
    print('\n已更新:')
    print('  ' + DATA_JSON)
    print('  ' + DATA_JS)
    print('\n刷新网页即可生效 —— 这些曲目会自动加入背景音乐轮播。')


if __name__ == '__main__':
    main()

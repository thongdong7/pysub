#!/usr/bin/env python

from setuptools import setup, find_packages

setup(
        name='subfind',
        version='2.0.0.0',
        description='Subtitle crawler written in Python',
        author='Thong Dong',
        author_email='thongdong7@gmail.com',
        url='https://github.com/thongdong7/subfind',
        packages=find_packages(exclude=["build", "dist", "tests*"]),
        install_requires=[
            'clint',
            'six',
            'subfind-provider-subscene>=2.0',
            # For python 2.6
            'importlib',
        ],
        entry_points={
            'console_scripts': [
                'subfind = subfind.cli:main',
            ],
        },
        classifiers=[
            "Development Status :: 5 - Production/Stable",
            "Environment :: Console",
            "License :: OSI Approved :: Python Software Foundation License",
            "Programming Language :: Python",
            "Programming Language :: Python :: 2.6",
            "Programming Language :: Python :: 2.7",
            "Programming Language :: Python :: 3.2",
            "Programming Language :: Python :: 3.3",
            "Programming Language :: Python :: 3.4",
            "Programming Language :: Python :: 3.5",
        ],
)

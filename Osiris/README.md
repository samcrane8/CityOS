# Osiris

Osiris is a codebase I'm building out in another repository, since it stands alone in solving the issue of scaleable, computer vision on n video streams.

So here I will just describe how to get Osiris running (it might be a bit sparse for a bit until I get a little further...). CityOS, for now, is really only a way to implement and visualize the Osiris platform.

## Flask Server

Install virtualenv is you'd like, then while in the environment install the dependencies with the requirement.txt file. 

To run the server through uwsgi, run the following command:

uwsgi --socket 0.0.0.0:5000 --protocol=http -w main:app
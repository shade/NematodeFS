
# NematodeFS

roundWORM File system

  
  

Nematode is a ext2 style block file system for BSV.

There are a couple parts to this project:
- The Nematode SDK
- FUSE Bindings
- The UI (not finished)

The Nematode SDK serves as the core of the entire project, in itself it is comprised of 2 major components: entries, and inodes. Similar to the structure of other ext2 file systems these inodes only contain links to and some file metadata. That being said, the entries contain names and stuff. More detail will be added in the accompanying documentation. 

The basic design concept of this entire thing is to take inodes and treat them like mini files which can be stored onchain. This allows for a design where one can essentially replicate their entire harddrive on the blockchain itself. However, they do not need to store all that information locally rather, they can use a small key or keypair to access it.

The FUSE bindings help create a layer of abstraction that allows developers and users to mount a virtual "folder" that can be accessed and used by programs and people in a manner that is completely virtual.

The UI is a simple webapp that links to the Nematode SDK, unfortunately I didn't have time to finish its implementation.

Lastly, one of the biggest elements to this entire thing is the element of time. Not only is this a file system that can store everything forever, it can store every interaction forever i.e. imagine this as if you're taking continous snapshots of your harddrive and permanently storing them.
# Nematode SDK

  
  

## API


### BSV Key Pair
### FileSystem

#### Constructor
```new Nematode(key: BSVKeyPair)```

- If a key is provided then the everything will load automatically. If no key is provided, one will be made, and must be loaded.  

#### Creating a directory
```Nematode.mkdir(parent: BSVKeyPair, name: string): INode```
- `Parent` is the key pair associated with the current directory
- `name` is the name of the new directory that is to be created
- Will throw error if there is another file or directory with the same name

#### Deleting a directory
```Nematode.rmdir(parent: BSVKeyPair, name: string): INode```
- `Parent` is the key pair associated with the current directory
- `name` is the name of the directory we are deleting


## Documentation

Manage your colors in `colors.config.yml`. Don't change anything in `colors.hbs` because it will be autogenerated.

Every color is called by a nodename and can store a color value or contain a sub level which itself holds multiple nodename/colorvalue couples

    'nodename1': "value"
    'nodename2':
      'nodename21': "value"
      'nodename22': "value"
      ...

Possible color values are HEX and RGB

    #000000
    rgb(0,0,0)

You may also add an title like this

    'nodename': "value;title"
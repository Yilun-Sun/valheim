import yaml
import json
import os


def delete_file(path):
    if os.path.exists(path):
        os.remove(path)
    else:
        print("The file does not exist")


def extract_file(file_name):
    f = open("D:\\Unpack Games\\Export Valheim\\extracting data\\PrefabInstance\\" + file_name + ".prefab", "r")
    line_start = 0
    line_end = 0
    before_trans = True
    item_name = ''
    line = 1
    item_id = ''
    mono = 0
    for x in f:
        if before_trans and "m_Name:" in x:
            item_name = x[x.index(':') + 1:len(x) - 1]
        if "Transform:" in x:
            before_trans = False
        if "MonoBehaviour:" in x:
            mono = mono + 1
            if mono == 3:
                line_start = line - 1
        if "ParticleSystemRenderer" in x:
            line_end = line - 2
        line = line + 1
        # print(x)
    # print(item_name)
    # print(line_start)
    # print(line_end)
    f.close()

    f_read = open("D:\\Unpack Games\\Export Valheim\\extracting data\\PrefabInstance\\" + file_name + ".prefab", "r")
    f_write = open("D:\\Unpack Games\\Export Valheim\\extracting data\\Prefabs\\" + file_name + ".yaml", "w+")
    line = 1
    for x in f_read:
        if line == line_start:
            item_id = x[x.index('&') + 1:len(x) - 1]
        if line_start < line <= line_end:
            if "m_Name:" in x:
                x = x[:len(x) - 1] + item_name + '\n'
            if line == line_start + 1:
                f_write.write(item_id + ':\n')
                f_write.write("  _id: " + item_id + '\n')
            else:
                # print(line)
                x = x.replace('m_', '', 1)
                f_write.write(x)
        line = line + 1
    f_read.close()
    f_write.close()

    with open("D:\\Unpack Games\\Export Valheim\\extracting data\\Prefabs\\" + file_name + ".yaml", 'r') as yaml_in, \
            open("D:\\Unpack Games\\Export Valheim\\extracting data\\Prefabs\\" + file_name + ".json",
                 "w+") as json_out:
        yaml_object = yaml.safe_load(yaml_in)  # yaml_object will be a list or a dict
        json.dump(yaml_object, json_out)

    delete_file("D:\\Unpack Games\\Export Valheim\\extracting data\\Prefabs\\" + file_name + ".yaml")

    with open("D:\\Unpack Games\\Export Valheim\\extracting data\\Prefabs\\" + file_name + ".json", 'r') as data_file:
        data = json.load(data_file)
    necessary_props = ["_id", "Name", "itemData"]
    unnecessary_props_in_item_data = ["attack", "secondaryAttack", "icons", "trophyPos", "buildPieces", "spawnOnHit",
                                      "spawnOnHitTerrain"]
    for item in data:
        for props in data[item].copy():
            if props not in necessary_props:
                del data[item][props]
            if props == "itemData":
                for props_in_itemData in data[item][props].copy():
                    if props_in_itemData == "shared":
                        data[item][props] = data[item][props]["shared"]
                        for props_in_mod_itemData in data[item][props].copy():
                            if props_in_mod_itemData in unnecessary_props_in_item_data or "Effect" in \
                                    props_in_mod_itemData or "ai" == props_in_mod_itemData[0:2]:
                                del data[item][props][props_in_mod_itemData]

    with open("D:\\Unpack Games\\Export Valheim\\extracting data\\Prefabs\\" + file_name + ".json", 'w') as data_file:
        json.dump(data, data_file)
    print("✔" + item_name)


file_names = ["Bread", "Copper", "Bronze", "SwordBronze", "SwordIron"]
for name in file_names:
    extract_file(name)

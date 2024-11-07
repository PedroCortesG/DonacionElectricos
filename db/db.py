import pymysql

def getConnection():
  conn = pymysql.connect(
    db='tarea2',
    user='cc5002',
    passwd='programacionweb',
    host='localhost',
    charset='utf8'
  )
  return conn

def getComunas(conn, region_id):
    sql = "select nombre from comuna where region_id =%s;"
    cursor = conn.cursor()
    cursor.execute(sql, (region_id,))
    conn.commit()
    comunas = cursor.fetchall()
    return comunas

def getRegiones(conn):
   sql = "select id from region;"
   cursor = conn.cursor()
   cursor.execute(sql)
   conn.commit()
   regiones = cursor.fetchall()
   return regiones




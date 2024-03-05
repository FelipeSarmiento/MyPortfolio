using System.Reflection;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace MyPortfolio.Server.Data;

public class ItemDashboardData
{

    // OBTENER LOS ITEMS DEL DASHBOARD (GET)
    public List<Section> GetSection()
    {
        List<Section> section = new List<Section>();

        var cn = new Connection();

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand("SELECT * FROM Section;", conec);
            conec.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    do
                    {
                        section.Add(new Section()
                        {
                            Id = reader["idSection"].ToString(),
                            Type = reader["type"].ToString(),
                            Label = reader["label"].ToString(),
                            IdUniqueIdentifier = reader["idUniqueIdentifier"].ToString(),
                            Value = reader["value"].ToString(),
                            Settings = GetItemSetting(Int32.Parse(reader["settings"].ToString())),
                            Items = GetItems(Int32.Parse(reader["idSection"].ToString()))
                        });
                    } while (reader.Read());
                }

            }

        }

        return section;
    }

    public List<string> GetOrderSections()
    {
        List<string> order = new List<string>();

        var cn = new Connection();

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand("SELECT idUniqueIdentifier FROM Section ORDER BY idSection ASC;", conec);
            conec.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    do
                    {
                        order.Add(reader["idUniqueIdentifier"].ToString());
                    } while (reader.Read());
                }

            }

        }

        return order;
    }

    public List<Items> GetItems(int idSection)
    {
        List<Items> items = new List<Items>();

        var cn = new Connection();

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand($"SELECT * FROM Items WHERE section = ${idSection};", conec);
            conec.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    do
                    {
                        items.Add(new Items()
                        {
                            Id = reader["idItems"].ToString(),
                            Type = reader["type"].ToString(),
                            Label = reader["label"].ToString(),
                            Value = reader["value"].ToString(),
                            IdUniqueIdentifier = reader["idUniqueIdentifier"].ToString(),
                            Settings = GetItemSetting(Int32.Parse(reader["settings"].ToString()))
                        });
                    }
                    while (reader.Read());
                }
            }

        }

        return items;
    }
    public ItemSetting GetItemSetting(int idItemSetting)
    {
        ItemSetting itemSetting = new ItemSetting();

        var cn = new Connection();

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand($"SELECT * FROM ItemSetting WHERE idItemSetting = ${idItemSetting};", conec);
            conec.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    itemSetting.Id = reader["idItemSetting"].ToString();
                    itemSetting.IdUniqueIdentifier = reader["idUniqueIdentifier"].ToString();
                    itemSetting.TextColor = GetItemSettingColor(Int32.Parse(reader["text_color"].ToString()));
                    itemSetting.TextSize = reader["text_size"].ToString();
                    itemSetting.TextWeight = reader["text_weight"].ToString();
                    itemSetting.TextAlign = reader["text_align"].ToString();
                    itemSetting.TextSpacing = reader["text_spacing"].ToString();
                    itemSetting.TextDecoration = reader["text_decoration"].ToString();
                    itemSetting.DecorationColor = GetItemSettingColor(Int32.Parse(reader["decoration_color"].ToString()));
                    itemSetting.BackgroundColor = GetItemSettingColor(Int32.Parse(reader["background_color"].ToString()));
                    itemSetting.BorderWidth = reader["border_width"].ToString();
                    itemSetting.BorderRadius = reader["border_radius"].ToString();
                    itemSetting.BorderColor = GetItemSettingColor(Int32.Parse(reader["border_color"].ToString()));
                    itemSetting.JustifyContent = reader["justify_content"].ToString();
                    itemSetting.ItemsAlign = reader["items_align"].ToString();
                    itemSetting.Display = reader["display"].ToString();
                    itemSetting.PaddingRight = reader["padding_right"].ToString();
                    itemSetting.PaddingLeft = reader["padding_left"].ToString();
                    itemSetting.PaddingTop = reader["padding_top"].ToString();
                    itemSetting.PaddingBottom = reader["padding_bottom"].ToString();
                    itemSetting.Opacity = reader["opacity"].ToString();
                    itemSetting.MarginRight = reader["margin_right"].ToString();
                    itemSetting.MarginLeft = reader["margin_left"].ToString();
                    itemSetting.MarginTop = reader["margin_top"].ToString();
                    itemSetting.MarginBottom = reader["margin_bottom"].ToString();
                    itemSetting.Height = reader["height"].ToString();
                    itemSetting.Width = reader["width"].ToString();
                    itemSetting.BorderRight = reader["border_right"].ToString();
                    itemSetting.BorderLeft = reader["border_left"].ToString();
                    itemSetting.BorderTop = reader["border_top"].ToString();
                    itemSetting.BorderBottom = reader["border_bottom"].ToString();
                }
            }
            conec.Close();

        }

        itemSetting.ClassName = itemSetting.ConcatenateValues();

        return itemSetting;
    }
    public ItemSettingColor GetItemSettingColor(int idItemSettingColor)
    {

        ItemSettingColor itemSettingColor = new ItemSettingColor();

        var cn = new Connection();

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand($"SELECT * FROM ItemSettingColor WHERE idItemSettingColor = ${idItemSettingColor};", conec);
            conec.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    itemSettingColor.Id = reader["idItemSettingColor"].ToString();
                    itemSettingColor.IdUniqueIdentifier = reader["idUniqueIdentifier"].ToString();
                    itemSettingColor.Type = reader["type"].ToString();
                    itemSettingColor.Color = reader["color"].ToString();
                    itemSettingColor.Intensity = reader["intensity"].ToString();
                }
            }
            conec.Close();

        }

        return itemSettingColor;
    }

    // EDITAR LOS ITEMS DEL DASHBOARD (PUT)

    public void EditItemsDashboard(Root root)
    {
        foreach (var section in root.Sections)
        {
            EditSection(section);
            foreach (var item in section.Items)
            {
                EditItems(item);
                EditItemSetting(item.Settings);
                EditItemSettingColor(item.Settings.TextColor);
                EditItemSettingColor(item.Settings.DecorationColor);
                EditItemSettingColor(item.Settings.BackgroundColor);
                EditItemSettingColor(item.Settings.BorderColor);
            }
        }
    }

    public Tuple<ItemSettingColor, bool> EditItemSettingColor(ItemSettingColor itemSettingColor)
    {
        var cn = new Connection();
        bool success = false;

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand("UPDATE ItemSettingColor SET type = '" + itemSettingColor.Type + "', color = '" + itemSettingColor.Color + "', intensity = '" + itemSettingColor.Intensity + "', idUniqueIdentifier = '" + itemSettingColor.IdUniqueIdentifier + "' WHERE idItemSettingColor = '" + itemSettingColor.Id + "'", conec);
            conec.Open();
            if (cmd.ExecuteNonQuery() > 0)
            {
                success = true;
            }
            conec.Close();
        }

        return new Tuple<ItemSettingColor, bool>(itemSettingColor, success);
    }

    public Tuple<ItemSetting, bool> EditItemSetting(ItemSetting itemSetting)
    {
        var cn = new Connection();
        bool success = false;

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand("UPDATE ItemSetting SET text_color = '" + itemSetting.TextColor.Id + "', text_size = '" + itemSetting.TextSize + "', text_weight = '" + itemSetting.TextWeight + "', text_align = '" + itemSetting.TextAlign + "', text_spacing = '" + itemSetting.TextSpacing + "', text_decoration = '" + itemSetting.TextDecoration + "', decoration_color = '" + itemSetting.DecorationColor.Id + "', background_color = '" + itemSetting.BackgroundColor.Id + "', border_width = '" + itemSetting.BorderWidth + "', border_radius = '" + itemSetting.BorderRadius + "', border_color = '" + itemSetting.BorderColor.Id + "', justify_content = '" + itemSetting.JustifyContent + "', items_align = '" + itemSetting.ItemsAlign + "', display = '" + itemSetting.Display + "', padding_right = '" + itemSetting.PaddingRight + "', padding_left = '" + itemSetting.PaddingLeft + "', padding_top = '" + itemSetting.PaddingTop + "', padding_bottom = '" + itemSetting.PaddingBottom + "', margin_right = '" + itemSetting.MarginRight + "', margin_left = '" + itemSetting.MarginLeft + "', margin_top = '" + itemSetting.MarginTop + "', margin_bottom = '" + itemSetting.MarginBottom + "', height = '" + itemSetting.Height + "', width = '" + itemSetting.Width + "', border_right = '" + itemSetting.BorderRight + "', border_left = '" + itemSetting.BorderLeft + "', border_top = '" + itemSetting.BorderTop + "', border_bottom = '" + itemSetting.BorderBottom + "', opacity = '" + itemSetting.Opacity + "', idUniqueIdentifier = '" + itemSetting.IdUniqueIdentifier + "'  WHERE idItemSetting = '" + itemSetting.Id + "'", conec);
            conec.Open();
            if (cmd.ExecuteNonQuery() > 0)
            {
                success = true;
            }
            conec.Close();
        }

        return new Tuple<ItemSetting, bool>(itemSetting, success);
    }

    public Tuple<Items, bool> EditItems(Items items)
    {
        var cn = new Connection();
        bool success = false;

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand("UPDATE Items SET type = '" +items.Type+ "', label = '" +items.Label+ "', value = '" +items.Value+ "', settings = '" +items.Settings.Id+ "', idUniqueIdentifier = '" + items.IdUniqueIdentifier + "' WHERE idItems = '" + items.Id + "'", conec);
            conec.Open();
            if (cmd.ExecuteNonQuery() > 0)
            {
                success = true;
            }
            conec.Close();
        }

        return new Tuple<Items, bool>(items, success);
    }

    public Tuple<Section, bool> EditSection(Section section)
    {
        var cn = new Connection();
        bool success = false;

        using (var conec = new SqlConnection(cn.getSQLString()))
        {
            SqlCommand cmd = new SqlCommand("UPDATE Section SET type = '" + section.Type + "', label = '" + section.Label + "', idUniqueIdentifier = '" + section.IdUniqueIdentifier + "', value = '" + section.Value + "', settings = '" + section.Settings.Id + "' WHERE idSection = '" + section.Id +"'", conec);
            conec.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    success = true;
                }

            }
            conec.Close();
        }

        return new Tuple<Section, bool>(section, success);
    }

}